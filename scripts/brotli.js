/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const fs = require("fs")
const glob = require("fast-glob")
const zlib = require("zlib")

// const PQueue = require("p-queue").default
const pqueue = async (...args) =>
  import("p-queue").then(({ default: PQueue }) => new PQueue(...args))

function compress(file) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(zlib.createBrotliCompress())
      .pipe(fs.createWriteStream(file + ".br"))
      .on("error", (err) => reject(err))
      .on("close", () => resolve())
  })
}

async function run() {
  const files = glob.sync("public/**.{js,css,html,map}")
  const queue = await pqueue({ concurrency: 10 })

  for (let file of files) {
    queue.add(() => compress(file))
  }

  await queue.onEmpty()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
