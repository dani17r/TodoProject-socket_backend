import "dotenv/config";
import config from "@main/config";
import { http } from "@main/server";

http.listen(config.PORT, async () => {
	console.log(`When it's ${new Date().toLocaleString()}`);
	console.log(`⚡ on ${config.URL_BASE}`);
});
