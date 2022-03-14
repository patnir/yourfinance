console.log("connected");
const tableRef = document.getElementById("tablebody");

const returns = {
  "youtube.com": "1000",
  "google.com": "10000",
  "facebook.com": "200",
};

const allVisits = [];

window.onload = async () => {
  const result = await chrome.history.search({ text: "", maxResults: 100000 });

  result.forEach((data) => {
    const { hostname } = new URL(data.url);

    const pieces = hostname.trim().split(".");
    if (pieces.length === 2) {
      allVisits.push(hostname);
    } else if (pieces.length == 3) {
      allVisits.push(pieces[1] + "." + pieces[2]);
      return;
    }
  });

  var counts = Array.from(new Set(allVisits)).map((a) => ({
    name: a,
    count: allVisits.filter((f) => f === a).length,
  }));

  counts.sort(function (a, b) {
    return b.count - a.count;
  });

  counts.forEach(({ name, count }) => {
    var newRow = tableRef.insertRow(tableRef.rows.length);
    if (name in returns) {
      newRow.innerHTML = `<td>${name}</td><td>${count}</td><td>${returns[name]}%</td>`;
    } else {
      newRow.innerHTML = `<td>${name}</td><td>${count}</td><td>NULL</td>`;
    }
  });
};
