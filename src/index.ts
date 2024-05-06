// COPY FROM: https://github.com/smeijer/next-runtime/blob/9bee117165e138f22a03b48a4a41c292cdd3a6a9/src/runtime/set-field.ts

function setField<T extends Record<string, unknown>>(
	data: any,
	name: string,
	value: unknown,
): T {
	// a[b][c] becomes [ a, b, c ]
	const path = name.replace(/\[([^\]]+)?]/g, ".$1").split(".");
	let pointer = data;

	// walk the path, and create objects and arrays where required
	for (let i = 0; i < path.length - 1; i++) {
		// empty strings and numeric values, indicate arrays
		path[i] = path[i] === "" ? pointer.length || "0" : path[i];
		pointer[path[i]!] =
			pointer[path[i]!] || (/^$|^[0-9]*$/.test(path[i + 1]!) ? [] : {});
		pointer = pointer[path[i]!];
	}

	const key = path[path.length - 1]!;

	if (Array.isArray(pointer)) {
		pointer.push(value);
	} else if (Array.isArray(pointer[key])) {
		pointer[key].push(value);
	} else {
		pointer[key] = value;
	}

	return data as T;
}

export function expand(
	formData: FormData,
	format = (field: { name: string; value: unknown }) => field.value ?? "",
): Record<string, unknown> {
	const obj = {};

	for (const [name, value] of formData.entries()) {
		setField(obj, name, format({ name, value }));
	}

	return obj;
}

export function stringify(formData: FormData): string {
	// @ts-expect-error ts is wrong here, formData is a valid argument
	return new URLSearchParams(formData).toString();
}

export function parse(query: string): FormData {
	const formData = new FormData();

	for (const [name, value] of new URLSearchParams(query).entries()) {
		formData.append(name, value);
	}

	return formData;
}
