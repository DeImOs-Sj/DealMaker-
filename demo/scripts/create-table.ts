import hardhat from "hardhat";
import { ethers } from "hardhat";
import { connect } from "@tableland/sdk";
import "./utils/fetch-polyfill";

async function main() {
  const [signer] = await ethers.getSigners();
  if (hardhat.network.config.chainId !== 80001) {
    throw new Error("Must be on mumbai");
  }
  const tableland = await connect({
    network: "testnet",
    chain: "polygon-mumbai",
    signer,
  });
  const { name } = await tableland.create(
    "id int, owner text, primary key (id)",
    "demo"
  );
  if (!name) {
    throw new Error("No name returned");
  }
  console.log("Table created with name:", name);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
