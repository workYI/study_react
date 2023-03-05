var CommentBox = React.createClass({
	displayName: 'CommentBox',

	getInitialState: function () {
		return { data: [] };
	},
	componentDidMount: function () {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function (data) {
				this.setState({ data: data });
			}.bind(this),
			error: function () {
				console.error(this.props.url);
			}.bind(this)
		});
	},
	handleCommentSubmit: function (comment) {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function (data) {
				this.setState({ data: data });
			}.bind(this),
			error: function () {
				console.error(this.props.url);
			}.bind(this)
		});
	},
	render: function () {
		return React.createElement(
			'div',
			{ className: 'CommentBox' },
			React.createElement(
				'h1',
				null,
				'コメント'
			),
			React.createElement(CommentList, { data: this.state.data }),
			React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
		);
	}
});
var CommentList = React.createClass({
	displayName: 'CommentList',

	render: function () {
		var commentNodes = this.props.data.map(function (comment) {
			return React.createElement(
				Comment,
				{ author: comment.author, key: comment.id },
				comment.text
			);
		});
		return React.createElement(
			'div',
			{ className: 'CommentList' },
			commentNodes
		);
	}
});
var Comment = React.createClass({
	displayName: 'Comment',

	rawMarkup: function () {
		var markDown = new Remarkable();
		var rawMarkup = markDown.render(this.props.children);
		return { __html: rawMarkup };
	},
	render: function () {
		return React.createElement(
			'div',
			{ className: 'Comment' },
			React.createElement(
				'h2',
				null,
				this.props.author
			),
			React.createElement('span', { dangerouslySetInnerHTML: this.rawMarkup() })
		);
	}
});
var CommentForm = React.createClass({
	displayName: 'CommentForm',

	getInitialState: function () {
		return { author: '', text: '' };
	},
	handleAuthorChange: function (eventObject) {
		this.setState({ author: eventObject.target.value });
	},
	handleTextChange: function (eventObject) {
		this.setState({ text: eventObject.target.value });
	},
	handleSubmit: function (eventObject) {
		eventObject.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		if (!author || !text) {
			return;
		}
		this.props.onCommentSubmit({ author: author, text: text });
		this.setState({ author: '', text: '' });
	},
	render: function () {
		return React.createElement(
			'form',
			{ className: 'CommentForm', onSubmit: this.handleSubmit },
			React.createElement('input', {
				type: 'text',
				placeholder: '名前',
				value: this.state.author,
				onChange: this.handleAuthorChange
			}),
			React.createElement('input', {
				type: 'text',
				placeholder: 'コメントを入力',
				value: this.state.text,
				onChange: this.handleTextChange
			}),
			React.createElement('input', { type: 'submit', value: '送信' })
		);
	}
});
ReactDOM.render(React.createElement(CommentBox, { url: '/api/comments' }), document.getElementById('content'));