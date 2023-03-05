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
	handleCommentSubmit: function(comment) {
		console.log(comment);
	},
	render: function() {
		return (
			<div className="CommentBox">
				<h1>コメント</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
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
		return {author: '', text: ''};
	},
	handleAuthorChange: function(eventObject) {
		this.setState({author: eventObject.target.value});
	},
	handleTextChange: function(eventObject) {
		this.setState({text: eventObject.target.value});
	},
	handleSubmit: function(eventObject) {
		eventObject.preventDefault();
		var author = this.state.author;
		var text = this.state.text;
		// console.log(author, text);
		this.props.onCommentSubmit({author: author, text: text});
		this.setState({author: '', text: ''});
	},
	render: function() {
		return (
			<form className="CommentForm" onSubmit={this.handleSubmit}>
				<input
					type="text"
					placeholder="名前"
					value={this.state.author}
					onChange={this.handleAuthorChange}
				/>
				<input
					type="text"
					placeholder="コメントを入力"
					value={this.state.text}
					onChange={this.handleTextChange}
				/>
				<input type="submit" value="送信" />
			</form>
		);
	}
});
ReactDOM.render(
	<CommentBox url="/api/comments" />,
	document.getElementById('content')
);