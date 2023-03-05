var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="CommentBox">
				<h1>コメント</h1>
				<CommentList />
				<CommentForm />
			</div>
		);
	}
});
var CommentList = React.createClass({
	render: function() {
		return (
			<div className="CommentList">
			CommentListを表示
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
	<CommentBox />,
	document.getElementById('content')
);