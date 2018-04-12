(function(isW,pid) {
	if (!isW) return;
	var ENDPOINT = 'http://localhost:3002/';
	window.onerror = function(msg, url, lineNo, columnNo, d) {
		track({
			message: d&&d.message||msg,
			lineNumber: lineNo,
			columnNumber:columnNo,
			stack: d&&d.stack,
			fileName: d&&d.fileName,
			name: d&&d.name,
			number: d&&d.number,
			description: d&&d.description,
			message: d&&d.message,
			url: url
		});
		return false;
	};
	window.addEventListener("unhandledrejection", function(a) {
		window.aa = a;
		a.promise.catch(track)
	})

	function track(d, n) {
		d = {
			stack: d.stack,
			fileName: d.fileName,
			name: d.name,
			lineNumber: d.lineNumber,
			columnNumber: d.columnNumber,
			number: d.number,
			description: d.description,
			message: d.message,
			url: d.url,
			at: new Date(),
			pid:pid
		}
		if (!d.message) return;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", ENDPOINT + 'rpc/taeSendError', true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				n && n(xhr.responseText)
			}
		};
		xhr.send(JSON.stringify({
			n: 'taeSendError',
			d: d
		}));
	}
})(typeof window !== 'undefined',PROJECT_ID)