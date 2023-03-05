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
				<Comment author="ヘンリー・キッシンジャー">チャンスは貯金できない。</Comment>
				<Comment author="マーク・トウェイン">禁煙なんてたやすい。私は何千回もやった。</Comment>
			</div>
		);
	}
});
var Comment = React.createClass({
	render: function() {
		return (
			<div className="Comment">
				<h2>{this.props.author}</h2>
				{this.props.children}
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