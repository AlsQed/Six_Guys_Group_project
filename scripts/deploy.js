const { ethers } = require("hardhat");

async function main() {
	const [deployer] = await ethers.getSigners();
	console.log("Deployer:", deployer.address);

	const supply = ethers.parseUnits("1000000", 18);
	const TestToken = await ethers.getContractFactory("TestToken");
	const tokenA = await TestToken.deploy("TokenA", "TKA", supply);
	const tokenB = await TestToken.deploy("TokenB", "TKB", supply);
	await tokenA.waitForDeployment();
	await tokenB.waitForDeployment();
	console.log("TokenA:", await tokenA.getAddress());
	console.log("TokenB:", await tokenB.getAddress());

	const DEX = await ethers.getContractFactory("DEX");
	const dex = await DEX.deploy(await tokenA.getAddress(), await tokenB.getAddress());
	await dex.waitForDeployment();
	console.log("DEX:", await dex.getAddress());

	// approve initial liquidity from deployer
	await (await tokenA.approve(await dex.getAddress(), ethers.MaxUint256)).wait();
	await (await tokenB.approve(await dex.getAddress(), ethers.MaxUint256)).wait();

	// add initial liquidity 10_000 each
	await (await dex.addLiquidity(ethers.parseUnits("10000", 18), ethers.parseUnits("10000", 18))).wait();
	console.log("Initial liquidity added");
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});


