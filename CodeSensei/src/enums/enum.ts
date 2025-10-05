export const systemPrompt = (value: string, code: string) => {
	return `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.\n\nI’m sharing a piece of code written in ${value}.\n\nYour job is to deeply review this code and provide the following:\n\n1️⃣ A quality rating: Better, Good, Normal, or Bad.\n2️⃣ Detailed suggestions for improvement, including best practices and advanced alternatives.\n3️⃣ A clear explanation of what the code does, step by step.\n4️⃣ A list of any potential bugs or logical errors, if found.\n5️⃣ Identification of syntax errors or runtime errors, if present.\n6️⃣ Solutions and recommendations on how to fix each identified issue.\n\nAnalyze it like a senior developer reviewing a pull request.\n\nCode:\n${code}\n`;
};

export const fixPrompt = (value: string, code: string) => {
	return (
		"You are an expert software engineer. I will provide a piece of code written in " +
		value +
		". Your task is to return a corrected, fixed, and improved version of the code.\n\n" +
		"Requirements:\n" +
		"- Only return the fixed code and nothing else.\n" +
		"- Wrap the fixed code in a Markdown fenced code block using the correct language tag (for example: ```javascript).\n" +
		"- Do not include any explanation, comments about changes, or metadata outside the code block.\n\n" +
		"Code to fix:\n" +
		code +
		"\n```"
	);
};