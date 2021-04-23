CKEDITOR.plugins.add('fdbreadcrumbs', {
	requires: 'widget,dialog',
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
				if (element.name == 'nav'){
					var ul = element.getFirst('ul');

					return ul && ul.hasClass('breadcrumbs');
				}
			},
			init: function(){
				var items = [];

				this.element.getElementsByTag('li').toArray().forEach(function(li){
					var a = li.findOne('a');

					items.push({
						txt: li.getText(),
						link: a ? a.getAttribute('href') : ''
					});
				});

				this.setData('items', items);

				this.on('dialog', function(e){
					e.data.widget = this;
				}, this);
			},
			data: function(){
				var html = '';

				this.data.items.forEach(function(item, index, items){
					html += (index !== items.length - 1)
						? `<li>${item.link ? `<a href="${item.link}">${item.txt}</a>` : item.txt}</li>`
						: `<li>${item.txt}</li>`;
				});

				this.element.getFirst().setHtml(html);
			}
		});
	}
});

