# React rendered Resume

A ReactJS app that takes resume info in a form and renders a resume in HTML (easily exportable to PDF).

## User Stories

The set of goals that the user will be able to complete using this app.

With this app, the user can:

1. View their resume next to form data
2. Make changes to form data to live-update the resume
3. Export the resume as PDF
4. Reopening the app should allow stories 1-3 with the last updated form data

## TODOs:

1. [X] Write existing resume data in a JSON file.
2. [X] Generate form fields from json data.
3. [X] Pre-populate form with json data.
4. [~] Modifying form inputs updates app state.
	1. ContactInfo is currently updating by looking up `name`
	2. Updating fields should happen by `key` attribute in react
	3. Install `nanoid` for that. Have `key` fields in data after app is loaded
	4. At time of finally saving the data, remove `key` from data.
	5. When `nanoid` is done, additionalfields can also be inside contactFields.
	6. `sections` is still remaining.
5. [ ] All data from form is correctly updated on the rendered resume.
6. [ ] Fix styling and rest of the issues.
