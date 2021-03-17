CKEDITOR.plugins.add('fdbreadcrumbs', {
	requires: 'widget,dialog,smethods',
	lang: 'en,ru,uk',
	icons: 'fdbreadcrumbs',

	init: function(editor){
		CKEDITOR.dialog.add('fdbreadcrumbs', `${this.path}dialogs/fdbreadcrumbs.js`);

		editor.widgets.add('fdbreadcrumbs', {
			allowedContent: 'nav[aria-label,role]; ul(!breadcrumbs); li',
			template: '<nav role="navigation"><ul class="breadcrumbs"></ul></nav>',
			button: editor.lang.fdbreadcrumbs.label,
			dialog: 'fdbreadcrumbs',

			upcast: function(element){
				return element.name == 'nav' && element.getFirst() && element.getFirst().hasClass('breadcrumbs');
			},
			init: function(){
				for (const item of this.element.getElementsByTag('li').toArray())
					this.pushData('items', [{
						txt: item.getText(),
						link: item.findOne('a') && item.findOne('a').getAttribute('href') || ''
					}]);
				this.on('dialog', function(evt){
					evt.data.widget = this;
				}, this);
			},
			data: function(){
				var items = '';

				if (!this.data.items)
					return;

				for (const item of this.data.items)
					if (item !== this.data.items.slice(-1)[0])
						items += `<li>${item.link ? `<a href="${item.link}">${item.txt}</a>` : item.txt}</li>`;
					else
						items += `<li>${item.txt}</li>`;

				this.element.getFirst().setHtml(items);
			}
		});
	}
});

