const puppeteer = require("puppeteer");

const checker = async (no) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	var value = null;
	await page.goto(
		"https://tgtransport.net/TGCFSTONLINE/Reports/OnlineLicenceSearch.aspx",
		{ waitUntil: "domcontentloaded" }
	);
	try {
		await page.evaluate(
			(val) =>
				(document.querySelector("#ctl00_OnlineContent_txtDlNo").value = val),
			no
		);
		await page.evaluate(() => {
			document.querySelector("#ctl00_OnlineContent_btnGet").click();
		});

		await page.screenshot({ path: "screenshot.png" });
		value = await page.evaluate(async () =>
			Array.from(
				document.querySelector("#ctl00_OnlineContent_gvLic").children[0]
					.children[1].children
			)
				.filter((i) => i.textContent.trim().length !== 0)
				.map((i) => {
					return i.textContent;
				})
		);
		// console.clear();
	} catch (error) {
		console.log(error.message);
	}
	await browser.close();

	return value;
};

module.exports = checker;
