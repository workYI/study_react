var CommentBox = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function() {
				console.error(this.props.url);
			}.bind(this)
		});
	},
	render: function() {
		return (
			<div className="CommentBox">
				<h1>コメント</h1>
				<CommentList data={this.state.data} />
				<CommentForm />
			</div>
		);
	}
});
var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
			return (
				<Comment author={comment.author} key={comment.id}>
				{comment.text}
				</Comment>
			);
		});
		return (
			<div className="CommentList">
			{commentNodes}
			</div>
		);
	}
});
var Comment = React.createClass({
	rawMarkup: function() {
		var markDown = new Remarkable();
		var rawMarkup = markDown.render(this.props.children);
		return {__html: rawMarkup};
	},
	render: function() {
		return (
			<div className="Comment">
				<h2>{this.props.author}</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
});
var CommentForm = React.createClass({
	getInitialState: function() {
		return {
			author: '湯川 秀樹',
			text: 'アイデアの秘訣は執念である。'
		};
	},
	handleSubmit: function(eventObject) {
		eventObject.preventDefault();
		var author = this.state.author;
		var text = this.state.text;
		console.log(author, text);
	},
	render: function() {
		return (
			<form className="CommentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="名前" value={this.state.author} />
				<input type="text" placeholder="コメントを入力" value={this.state.text} />
				<input type="submit" value="送信" />
			</form>
		);
	}
});
ReactDOM.render(
	<CommentBox url="/api/comments" />,
	document.getElementById('content')
);