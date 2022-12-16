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
	1. [X] ContactInfo is currently updating by looking up `name`
	2. [X] ~~Updating fields should happen by `key` attribute in react~~. By `index` and `id` attrs.
	3. [~] ~~Install `nanoid` for that. Have `key` fields in data after app is loaded~~. Decided against random keys.
	4. [~] ~~At time of finally saving the data, remove `key` from data.~~ No need.
	5. [X] ~~When `nanoid` is done, additionalfields can also be inside contactFields.~~ Done. Nanoid no need.
	6. [X] `sections` is still remaining.
	7. [X] Progress Bars remaining.
5. [X] All data from form is correctly updated on the rendered resume.

### Tasks remaining

1. [ ] Deletable items.
2. [ ] Collapsible form so it displays resume full width of window.
3. [ ] 'Save and Generate PDF' button.
