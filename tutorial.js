async function main() {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://admin:" + process.env.Mongo_Admin_PW + "@dayinthelife-dev.ozz3z.mongodb.net/testdb?retryWrites=true&w=majority";
  // const uri = "mongodb+srv://admin:Password123@dayinthelife-dev.ozz3z.mongodb.net/testdb?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect()
    // await listDatabases(client)
    // await createListing(
    //   client,
    // {
    //   name: "testName",
    //   summary: "Ipsum lorem hfalkdsh aksjdhalkfdj",
    //   num: 1
    // }
    // )
    // await createMultipleListings(client,
    //   [
    //     {
    //       name: "testName",
    //       summary: "Ipsum lorem hfalkdsh aksjdhalkfdj",
    //       num: 1
    //     },
    //     {
    //       name: "testName",
    //       summary: "Ipsum lorem hfalkdsh aksjdhalkfdj",
    //       num: 2
    //     },
    //     {
    //       name: "testName",
    //       summary: "Ipsum lorem hfalkdsh aksjdhalkfdj",
    //       num: 3
    //     }
    //   ]
    // )
    // await findOneListingByName(client, "testName")
    // await findListingsMinimumNum(client, {num: 0})
    // await findOneListingByName(client, "testName")
    // await updateListingByName(client, "testName", {name: "updateMe"})
    // await findOneListingByName(client, "updateMe")
    // await upsertListingByName(client, "thisDoesNotExistYet", { num: 250 })
    // await updateAllListingsToHavePropertyType(client)
    // await deleteListingByName(client, "testName")
    // await deleteListingsAboveNum(client, 4)
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

main().catch(console.err)

async function deleteListingsAboveNum(client, num) {
  const result = await client.db("testdb").collection("testcol")
    .deleteMany({ "num": { $gte: num } })
  console.log(`${result.deletedCount} document(s) was/were deleted`)
}

async function deleteListingByName(client, nameOfListing) {
  const result = await client.db("testdb").collection("testcol")
    .deleteOne({ name: nameOfListing })
  console.log(`${result.deletedCount} document(s) was/were deleted`)
}

async function updateAllListingsToHavePropertyType(client) {
  const result = await client.db("testdb").collection("testcol")
    .updateMany(
      { property_type: { $exists: false } },
      { $set: { property_type: "Unknown" } })
  console.log(`${result.matchedCount} document(s) matched the filter criteria`)
  console.log(`${result.modifiedCount} document(s) was/were updated`)
}

async function upsertListingByName(client, nameOfListing, updatedListing) {
  const result = await client.db("testdb").collection("testcol").updateOne(
    { name: nameOfListing },
    { $set: updatedListing },
    { upsert: true }
  )
  console.log(`${result.matchedCount} document(s) matched the query criteria`)
  if (result.upsertedCount > 0) {
    console.log(`One document was inserted with the id ${result.upsertedId._id}`)
  } else {
    console.log(`${result.modifiedCount} document(s) was/were updated`)
  }
}

async function updateListingByName(client, nameOfListing, updatedListing) {
  const result = await client.db("testdb").collection("testcol").updateOne(
    { name: nameOfListing },
    { $set: updatedListing }
  )
  console.log(`${result.matchedCount} document(s) matched the query criteria`)
  console.log(`${result.modifiedCount} document(s) was/were updated`)
}

async function findListingsMinimumNum(client, {
  num = 0,
  maxResults = Number.MAX_SAFE_INTEGER
}) {
  const cursor = client.db("testdb").collection("testcol").find({
    num: { $gte: num }
  })
    .limit(maxResults)

  const results = await cursor.toArray() //make sure you are handling a manageble number of results
  if (results.length > 0) {
    console.log(`Found lisitng(s) with at least ${num}`)
    results.forEach((result, i) => {
      console.log()
      console.log(`${i + 1}. name: ${result.name}`)
      console.log(`   _id: ${result._id}`)
      console.log(`   summary ${result.summary}`)
      console.log(`   nume: ${result.num}`)
    })
  }
}

async function findOneListingByName(client, nameOfListing) {
  const result = await client.db("testdb").collection("testcol").findOne({ name: nameOfListing })
  if (result) {
    console.log(`Found a listing in the collection with the name ${nameOfListing}`)
    console.log(result)
  } else {
    console.log(`No listings found with the name ${nameOfListing}`)
  }
}

async function createMultipleListings(client, newListings) {
  const result = await client.db("testdb").collection("testcol").insertMany(newListings)
  console.log(`${result.insertedCount} new listing(s) created with the following id(s)`)
  console.log(result.insertedIds)
}

async function createListing(client, newListing) {
  const result = await client.db("testdb").collection("testcol").insertOne(newListing)
  console.log(`New Listing created with the following id: ${result.insertedId}`)
}

async function listDatabases(client) {
  const dbList = await client.db().admin().listDatabases();

  console.log("Databases:")
  dbList.databases.forEach(db => console.log(db))
}