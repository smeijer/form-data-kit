import assert from "node:assert/strict";
import test from "node:test";

import { expand, parse, stringify } from "./index.js";

await test("can stringify form data", () => {
	const formData = new FormData();
	formData.append("one", "1");
	formData.append("two", "2");
	formData.append("nested.three", "3");
	formData.append("array[0]", "4");

	assert.strictEqual(
		stringify(formData),
		"one=1&two=2&nested.three=3&array%5B0%5D=4",
	);
});

await test("can parse form data", () => {
	const formData = parse("one=1&two=2&nested.three=3&array%5B0%5D=4");
	formData.append("one", "1");
	formData.append("two", "2");
	formData.append("nested.three", "3");
	formData.append("array[0]", "4");

	assert.strictEqual(formData.get("one"), "1");
	assert.strictEqual(formData.get("two"), "2");
	assert.strictEqual(formData.get("nested.three"), "3");
	assert.strictEqual(formData.get("array[0]"), "4");
});

await test("can expand form data", () => {
	const formData = new FormData();
	formData.append("one", "1");
	formData.append("two", "2");
	formData.append("nested.three", "3");
	formData.append("array[0]", "4");
	formData.append("array[1].five", "5");

	const data = expand(formData);
	assert.deepEqual(data, {
		one: "1",
		two: "2",
		nested: {
			three: "3",
		},
		array: ["4", { five: "5" }],
	});
});

await test("foo", () => {
	const formData = new FormData();
	formData.set("one", "foo");
	formData.set("two", "bar");

	console.log(stringify(formData));
});
