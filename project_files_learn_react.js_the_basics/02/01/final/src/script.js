var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="CommentBox">
			Comment Boxを表示(ExternalFile)
			</div>
		);
	}
});
ReactDOM.render(
	<CommentBox />,
	document.getElementById('content')
);