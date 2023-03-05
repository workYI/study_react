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
				<Comment author="ヘンリー・キッシンジャー">チャンスは__貯金__できない。</Comment>
				<Comment author="マーク・トウェイン">禁煙なんてたやすい。私は*何千回*もやった。</Comment>
			</div>
		);
	}
});
var Comment = React.createClass({
	render: function() {
		var markDown = new Remarkable();
		var rawMarkup = markDown.render(this.props.children);
		return (
			<div className="Comment">
				<h2>{this.props.author}</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
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