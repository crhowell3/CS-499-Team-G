const { header } = require("express-validator");

function getData() {
	var req = new XMLHttpRequest();
	if (document.getElementById("selection").value === "1") {
		req.open("POST", "http://68.93.20.191:5000/users/payroll", false);
		req.send(null);

		var payrollJson = JSON.parse(req.responseText);
		payrollTable(payrollJson);
	} else if (document.getElementById("selection").value === "2") {
		req.open("POST", "http://68.93.20.191:5000/vehicles/maintenance", false);
		req.send(null);

		var costJson = JSON.parse(req.responseText);
		vehicleMaintenanceTable(costJson);
	} else if (document.getElementById("selection").value === "3") {
		req.open("GET", "http://68.93.20.191:5000/vehicles", false);
		req.send(null);

		var vehicleJson = JSON.parse(req.responseText);
		totalMaintenanceTable(vehicleJson);
	} else if (document.getElementById("selection").value === "4") {
		req.open("POST", "http://68.93.20.191:5000/shipments/incoming", false);
		req.send(null);

		var incomingJson = JSON.parse(req.responseText);
		incomingShipmentTable(incomingJson);
	} else if (document.getElementById("selection").value === "5") {
		req.open("POST", "http://68.93.20.191:5000/shipments/outgoing", false);
		req.send(null);

		var outgoingJson = JSON.parse(req.responseText);
		outgoingShipmentTable(outgoingJson);
	}
}

function payrollTable(data) {
	// Get table and clear if it has data already
	var table = document.getElementById("reports");
	while (table.rows.length > 0) {
		table.deleteRow(0);
	}

	// Create header elements and initial header row
	var headerRow = document.createElement("tr");
	var name = document.createElement("th");
	var title = document.createElement("th");
	var payrate = document.createElement("th");
	var tenure = document.createElement("th");

	//
	name.appendChild(document.createTextNode("Name"));
	title.appendChild(document.createTextNode("Position"));
	payrate.appendChild(document.createTextNode("Pay Rate"));
	tenure.appendChild(document.createTextNode("Tenure"));

	// Append header elements to the row element
	headerRow.appendChild(name);
	headerRow.appendChild(title);
	headerRow.appendChild(payrate);
	headerRow.appendChild(tenure);

	// Append the row to the table
	table.appendChild(headerRow);

	for (let i = 0; i < data.length; i++) {
		// Create row element
		var row = document.createElement("tr");

		var cell1 = document.createElement("td");
		var cell2 = document.createElement("td");
		var cell3 = document.createElement("td");
		var cell4 = document.createElement("td");

		cell1.appendChild(
			document.createTextNode(
				data[i].fullName.firstName + " " + data[i].fullName.lastName
			)
		);
		cell2.appendChild(document.createTextNode(data[i].title));
		cell3.appendChild(document.createTextNode("$" + data[i].payRate * 40 * 4));
		cell4.appendChild(document.createTextNode(data[i].tenure));

		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		row.appendChild(cell4);

		table.appendChild(row);
	}
}

function vehicleMaintenanceTable(data) {
	// Get table and clear if it has data already
	var table = document.getElementById("reports");
	while (table.rows.length > 0) {
		table.deleteRow(0);
	}

	// Create header elements and initial header row
	var headerRow = document.createElement("tr");
	var make = document.createElement("th");
	var model = document.createElement("th");
	var year = document.createElement("th");
	var kind = document.createElement("th");
	var maintenance = document.createElement("th");
	var description = document.createElement("th");
	var parts = document.createElement("th");
	var cost = document.createElement("th");

	// Populate header elements with text nodes
	make.appendChild(document.createTextNode("Make"));
	model.appendChild(document.createTextNode("Model"));
	year.appendChild(document.createTextNode("Year"));
	kind.appendChild(document.createTextNode("Body Style"));
	maintenance.appendChild(document.createTextNode("Maintenance"));
	description.appendChild(document.createTextNode("Description"));
	parts.appendChild(document.createTextNode("Parts"));
	cost.appendChild(document.createTextNode("Cost"));

	headerRow.appendChild(make);
	headerRow.appendChild(model);
	headerRow.appendChild(year);
	headerRow.appendChild(kind);
	headerRow.appendChild(maintenance);
	headerRow.appendChild(description);
	headerRow.appendChild(parts);
	headerRow.appendChild(cost);

	table.appendChild(headerRow);

	for (let i = 0; i < data.length; i++) {
		// Create row element
		var row = document.createElement("tr");

		// Create each data field element
		var cell1 = document.createElement("td");
		var cell2 = document.createElement("td");
		var cell3 = document.createElement("td");
		var cell4 = document.createElement("td");
		var cell5 = document.createElement("td");
		var cell6 = document.createElement("td");
		var cell7 = document.createElement("td");
		var cell8 = document.createElement("td");

		cell1.appendChild(document.createTextNode(data[i].brand));
		cell2.appendChild(document.createTextNode(data[i].model));
		cell3.appendChild(document.createTextNode(data[i].year));
		cell4.appendChild(document.createTextNode(data[i].kind));
		cell5.appendChild(
			document.createTextNode(data[i].maintenanceRecord.maintenance)
		);
		cell6.appendChild(
			document.createTextNode(
				data[i].maintenanceRecord.repairRecords.description
			)
		);
		cell7.appendChild(
			document.createTextNode(data[i].maintenanceRecord.repairRecords.parts)
		);
		cell8.appendChild(
			document.createTextNode(data[i].maintenanceRecord.repairRecords.cost)
		);

		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		row.appendChild(cell4);
		row.appendChild(cell5);
		row.appendChild(cell6);
		row.appendChild(cell7);
		row.appendChild(cell8);
		table.appendChild(row);
	}
}

function totalMaintenanceTable(data) {
	// Get table and clear if it has data already
	var table = document.getElementById("reports");
	while (table.rows.length > 0) {
		table.deleteRow(0);
	}

	// Create header elements and initial header row
	var headerRow = document.createElement("tr");
	var make = document.createElement("th");
	var model = document.createElement("th");
	var year = document.createElement("th");
	var kind = document.createElement("th");
	var maintenance = document.createElement("th");
	var description = document.createElement("th");
	var parts = document.createElement("th");
	var inspections = document.createElement("th");
	var date = document.createElement("th");

	// Populate header elements with text nodes
	make.appendChild(document.createTextNode("Make"));
	model.appendChild(document.createTextNode("Model"));
	year.appendChild(document.createTextNode("Year"));
	kind.appendChild(document.createTextNode("Body Style"));
	maintenance.appendChild(document.createTextNode("Maintenance"));
	description.appendChild(document.createTextNode("Description"));
	parts.appendChild(document.createTextNode("Parts"));
	inspections.appendChild(document.createTextNode("Inspections"));
	date.appendChild(document.createTextNode("Date"));

	headerRow.appendChild(make);
	headerRow.appendChild(model);
	headerRow.appendChild(year);
	headerRow.appendChild(kind);
	headerRow.appendChild(maintenance);
	headerRow.appendChild(description);
	headerRow.appendChild(parts);
	headerRow.appendChild(inspections);
	headerRow.appendChild(date);

	table.appendChild(headerRow);

	for (let i = 0; i < data.length; i++) {
		// Create row element
		var row = document.createElement("tr");

		// Create each data field element
		var cell1 = document.createElement("td");
		var cell2 = document.createElement("td");
		var cell3 = document.createElement("td");
		var cell4 = document.createElement("td");
		var cell5 = document.createElement("td");
		var cell6 = document.createElement("td");
		var cell7 = document.createElement("td");
		var cell8 = document.createElement("td");
		var cell9 = document.createElement("td");

		cell1.appendChild(document.createTextNode(data[i].brand));
		cell2.appendChild(document.createTextNode(data[i].model));
		cell3.appendChild(document.createTextNode(data[i].year));
		cell4.appendChild(document.createTextNode(data[i].kind));
		cell5.appendChild(
			document.createTextNode(data[i].maintenanceRecord.maintenance)
		);
		cell6.appendChild(
			document.createTextNode(
				data[i].maintenanceRecord.repairRecords.description
			)
		);
		cell7.appendChild(
			document.createTextNode(data[i].maintenanceRecord.repairRecords.parts)
		);
		cell8.appendChild(
			document.createTextNode(
				data[i].maintenanceRecord.inspectionsRecords.inspections
			)
		);
		cell9.appendChild(
			document.createTextNode(data[i].maintenanceRecord.inspectionsRecords.date)
		);

		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		row.appendChild(cell4);
		row.appendChild(cell5);
		row.appendChild(cell6);
		row.appendChild(cell7);
		row.appendChild(cell8);
		row.appendChild(cell9);

		table.appendChild(row);
	}
}

function incomingShipmentTable(data) {
	// Get table and clear if it has data already
	var table = document.getElementById("reports");
	while (table.rows.length > 0) {
		table.deleteRow(0);
	}

	// Create header elements and initial header row
	var headerRow = document.createElement("tr");
	var traffic = document.createElement("th");
	var origin = document.createElement("th");
	var destination = document.createElement("th");
	var vim = document.createElement("th");
	var depart = document.createElement("th");
	var arrive = document.createElement("th");
	var status = document.createElement("th");
	var payment = document.createElement("th");

	// Populate header elements with text nodes
	traffic.appendChild(document.createTextNode("Traffic"));
	origin.appendChild(document.createTextNode("Origin"));
	destination.appendChild(document.createTextNode("Destination"));
	vim.appendChild(document.createTextNode("Vehicle ID"));
	depart.appendChild(document.createTextNode("Departure Date"));
	arrive.appendChild(document.createTextNode("Arrival Date"));
	status.appendChild(document.createTextNode("Status"));
	payment.appendChild(document.createTextNode("Paid"));

	// Append the header elements to the row element
	headerRow.appendChild(traffic);
	headerRow.appendChild(origin);
	headerRow.appendChild(destination);
	headerRow.appendChild(vim);
	headerRow.appendChild(depart);
	headerRow.appendChild(arrive);
	headerRow.appendChild(status);
	headerRow.appendChild(payment);

	// Append the row to the table
	table.appendChild(headerRow);

	for (let i = 0; i < data.length; i++) {
		// Create row element
		var row = document.createElement("tr");

		// Create each data field element
		var cell1 = document.createElement("td");
		var cell3 = document.createElement("td");
		var cell4 = document.createElement("td");
		var cell5 = document.createElement("td");
		var cell6 = document.createElement("td");
		var cell7 = document.createElement("td");
		var cell8 = document.createElement("td");
		var cell9 = document.createElement("td");

		// Populate each data field with a text node
		cell1.appendChild(document.createTextNode(data[i].traffic));
		cell3.appendChild(document.createTextNode(data[i].origin.oCompany));
		cell4.appendChild(document.createTextNode(data[i].destination.dCompany));
		cell5.appendChild(document.createTextNode("N/A"));
		cell6.appendChild(document.createTextNode(data[i].departureDate));
		cell7.appendChild(document.createTextNode(data[i].arrivalDate));
		if (data[i].arrivalStatus) {
			cell8.appendChild(document.createTextNode("Arrived"));
		} else {
			cell8.appendChild(document.createTextNode("In Process"));
		}
		if (data[i].payment) {
			cell9.appendChild(document.createTextNode("Yes"));
		} else {
			cell9.appendChild(document.createTextNode("No"));
		}

		row.appendChild(cell1);
		row.appendChild(cell3);
		row.appendChild(cell4);
		row.appendChild(cell5);
		row.appendChild(cell6);
		row.appendChild(cell7);
		row.appendChild(cell8);
		row.appendChild(cell9);

		table.appendChild(row);
	}
}

function outgoingShipmentTable(data) {
	// Get table and clear if it has data already
	var table = document.getElementById("reports");
	while (table.rows.length > 0) {
		table.deleteRow(0);
	}

	// Create header elements and initial header row
	var headerRow = document.createElement("tr");
	var traffic = document.createElement("th");
	var origin = document.createElement("th");
	var destination = document.createElement("th");
	var vim = document.createElement("th");
	var depart = document.createElement("th");
	var arrive = document.createElement("th");
	var status = document.createElement("th");
	var payment = document.createElement("th");

	// Populate header elements with text nodes
	traffic.appendChild(document.createTextNode("Traffic"));
	origin.appendChild(document.createTextNode("Origin"));
	destination.appendChild(document.createTextNode("Destination"));
	vim.appendChild(document.createTextNode("Vehicle ID"));
	depart.appendChild(document.createTextNode("Departure Date"));
	arrive.appendChild(document.createTextNode("Arrival Date"));
	status.appendChild(document.createTextNode("Status"));
	payment.appendChild(document.createTextNode("Paid"));

	// Append the header elements to the row element
	headerRow.appendChild(traffic);
	headerRow.appendChild(origin);
	headerRow.appendChild(destination);
	headerRow.appendChild(vim);
	headerRow.appendChild(depart);
	headerRow.appendChild(arrive);
	headerRow.appendChild(status);
	headerRow.appendChild(payment);

	// Append the row to the table
	table.appendChild(headerRow);

	for (let i = 0; i < data.length; i++) {
		// Create row element
		var row = document.createElement("tr");

		// Create each data field element
		var cell1 = document.createElement("td");
		var cell3 = document.createElement("td");
		var cell4 = document.createElement("td");
		var cell5 = document.createElement("td");
		var cell6 = document.createElement("td");
		var cell7 = document.createElement("td");
		var cell8 = document.createElement("td");
		var cell9 = document.createElement("td");

		// Populate each data field with a text node
		cell1.appendChild(document.createTextNode(data[i].traffic));
		cell3.appendChild(document.createTextNode(data[i].origin.oCompany));
		cell4.appendChild(document.createTextNode(data[i].destination.dCompany));
		cell5.appendChild(document.createTextNode("N/A"));
		cell6.appendChild(document.createTextNode(data[i].departureDate));
		cell7.appendChild(document.createTextNode(data[i].arrivalDate));
		if (data[i].arrivalStatus) {
			cell8.appendChild(document.createTextNode("Arrived"));
		} else {
			cell8.appendChild(document.createTextNode("In Process"));
		}
		if (data[i].payment) {
			cell9.appendChild(document.createTextNode("Yes"));
		} else {
			cell9.appendChild(document.createTextNode("No"));
		}

		row.appendChild(cell1);
		row.appendChild(cell3);
		row.appendChild(cell4);
		row.appendChild(cell5);
		row.appendChild(cell6);
		row.appendChild(cell7);
		row.appendChild(cell8);
		row.appendChild(cell9);

		table.appendChild(row);
	}
}
