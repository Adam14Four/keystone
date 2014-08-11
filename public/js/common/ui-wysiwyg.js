jQuery(function($) {

	if (!window.tinymce)
		return;

	var plugins = [ 'code', 'link' ],
		toolbar = 'bold italic | alignleft aligncenter alignright | bullist numlist | outdent indent | link';

	if (Keystone.wysiwyg.options.enableImages) {
		plugins.push('image');
		toolbar += ' | image';
	}

	if (Keystone.wysiwyg.options.enableCloudinaryUploads) {
		plugins.push('uploadimage');
		toolbar += (Keystone.wysiwyg.options.enableImages) ? ' uploadimage' : ' | uploadimage';
	}

	if (Keystone.wysiwyg.options.additionalButtons) {
		var additionalButtons = Keystone.wysiwyg.options.additionalButtons.split(',');
		for (var i=0; i<additionalButtons.length; i++) {
			toolbar += (' | ' + additionalButtons[i]);
		}
	}
	if (Keystone.wysiwyg.options.additionalPlugins) {
		var additionalPlugins = Keystone.wysiwyg.options.additionalPlugins.split(',');
		for (var i=0; i<additionalPlugins.length; i++) {
			plugins.push(additionalPlugins[i]);
		}
	}
	toolbar += ' | code';

	//init editable wysiwygs
	var tinymceOptions = {
		selector: 'textarea.wysiwyg',
		menubar: false,
		plugins: plugins,
		toolbar: toolbar,
		skin: 'keystone',
		uploadimage_form_url: '/keystone/api/cloudinary/upload'
	};

	if(Keystone.wysiwyg.options.additionalOptions){
		$.extend(tinymceOptions,Keystone.wysiwyg.options.additionalOptions);
	}

	tinymce.init(tinymceOptions);

	//init non-editable wysiwygs
	var tinymceOptionsNonEditable = {
		selector: 'textarea.wysiwyg-noedit',
		mode: 'textareas',
		readonly: true,
		menubar: false,
		plugins: plugins,
		toolbar: 'code',
		statusbar: false,
		skin: 'keystone'
	};

	if(Keystone.wysiwyg.options.additionalOptions){
		$.extend(tinymceOptionsNonEditable,Keystone.wysiwyg.options.additionalOptions);
	}


	tinymce.init(tinymceOptionsNonEditable);

});