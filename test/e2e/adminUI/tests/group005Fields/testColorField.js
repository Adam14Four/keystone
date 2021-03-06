var fieldTests = require('./commonFieldTestUtils.js');
var ColorModelTestConfig = require('../../../modelTestConfig/ColorModelTestConfig');

module.exports = {
	before: fieldTests.before,
	after: fieldTests.after,
	'Color field should show correctly in the initial modal': function (browser) {
		browser.adminUIApp.openFieldList('Color');
		browser.listScreen.createFirstItem();
		browser.adminUIApp.waitForInitialFormScreen();

		browser.initialFormScreen.assertFieldUIVisible({
			modelTestConfig: ColorModelTestConfig,
			fields: [{name: 'name'}, {name: 'fieldA'}]
		});
	},
	'restoring test state': function(browser) {
		browser.initialFormScreen.cancel();
		browser.adminUIApp.waitForListScreen();
	},
	'Color field can be filled via the initial modal': function(browser) {
		browser.adminUIApp.openFieldList('Color');
		browser.listScreen.createFirstItem();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.initialFormScreen.fillFieldInputs({
			modelTestConfig: ColorModelTestConfig,
			fields: {
				'name': {value: 'Color Field Test 1'},
				'fieldA': {value: '#002147'},
			}
		});
		browser.initialFormScreen.assertFieldInputs({
			modelTestConfig: ColorModelTestConfig,
			fields: {
				'name': {value: 'Color Field Test 1'},
				'fieldA': {value: '#002147'},
			}
		});
		browser.initialFormScreen.save();
		browser.adminUIApp.waitForItemScreen();

		browser.itemScreen.assertFieldInputs({
			modelTestConfig: ColorModelTestConfig,
			fields: {
				'name': {value: 'Color Field Test 1'},
				'fieldA': {value: '#002147'},
			}
		})
	},
	'Color field should show correctly in the edit form': function(browser) {
		browser.itemScreen.assertFieldUIVisible({
			modelTestConfig: ColorModelTestConfig,
			fields: [{name: 'fieldA'}, {name: 'fieldB'}]
		});
	},
	'Color field can be filled via the edit form': function(browser) {
		browser.itemScreen.fillFieldInputs({
			modelTestConfig: ColorModelTestConfig,
			fields: {
				'fieldB': {value: '#f8e71c'}
			}
		});
		browser.itemScreen.save();
		browser.adminUIApp.waitForItemScreen();
		browser.itemScreen.assertFlashMessage('Your changes have been saved successfully');
		browser.itemScreen.assertFieldInputs({
			modelTestConfig: ColorModelTestConfig,
			fields: {
				'name': {value: 'Color Field Test 1'},
				'fieldA': {value: '#002147'},
				'fieldB': {value: '#f8e71c'}
			}
		})
	},
};
