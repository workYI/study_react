/*
var data = [
	{id: 1, author: "ヘンリー・キッシンジャー", text: "チャンスは__貯金__できない。"},
	{id: 2, author: "マーク・トウェイン", text: "禁煙なんてたやすい。私は*何千回*もやった。"}
];
*/

// クラスの定義
var CommentBox1 = React.createClass({
	getInitialState: function(){
		return {data: [
		]};
	},
	render: function() {
		return (
			<div className="CommentBox1">
			    <h1>コメント</h1>
				<CommentList data={this.state.data} />
                <CommentForm />
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function() {
        // commentNodesプロパティを定義
        // ここで[data]プロパティのmapメソッドを使用することでリスト要素分が繰り返される
        var commentNodes = this.props.data.map(function(comment){
            return(
                <Comment author={comment.author} key={comment.id}>
                {comment.text}
                </Comment>
            );
        });

        // CommentListクラスの返却値を定義
		return (
            <div className="CommentList">
            {commentNodes}
            </div>
		);
	} 
});

/*
var Comment = React.createClass({
	render: function() {
        // Remarkableインスタンスを生成
        var markDown = new Remarkable();

        // Remarkableクラスを定義
        var rawMarkup = markDown.render(this.props.children);

		return (
			<div className="Comment">
                <h2>No.{this.props.orderno} {this.props.author}</h2>
				{this.props.children}
                <span dangerouslySetInnerHTML={{__html: rawMarkup}}></span>
			</div>
		);
	}
});
*/

var Comment = React.createClass({
    // rawMarkupプロパティの定義
    rawMarkup: function(){
        // Remarkableインスタンスを生成
        var markDown = new Remarkable();
        // Remarkableクラスを定義
        var rawMarkup = markDown.render(this.props.children);
        return {__html: rawMarkup};
    },
    // renderプロパティの定義（複数プロパティあるのでカンマで区切る）
	render: function() {
		return (
			<div className="Comment">
                <h2>No.{this.props.orderno} {this.props.author}</h2>
				{this.props.children}
                <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
			</div>
		);
	}
});

var CommentForm = React.createClass({
	render: function() {
		return (
			<div className="CommentForm">
			CommentContentsを表示
			</div>
		);
	}
});


// 第一引数：どのクラスから作ったものかを定義
// 第二引数：どこに差し込むのかを定義（HTML側で定義する）
ReactDOM.render(
	<CommentBox url="/api/comments" />,
	document.getElementById('content_1')
);