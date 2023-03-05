var CommentBox = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function(data) {
				this.setState({data: data});
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
	render: function() {
		return (
			<div className="CommentForm">
			CommentFormを表示
			</div>
		);
	}
});
ReactDOM.render(
	<CommentBox url="/api/comments" />,
	document.getElementById('content')
);