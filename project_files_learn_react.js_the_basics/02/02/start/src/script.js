var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="CommentBox">
			Comment Boxを表示
			</div>
		);
	}
});
ReactDOM.render(
	<CommentBox />,
	document.getElementById('content')
);