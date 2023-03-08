
// クラスの定義
var CommentBox1 = React.createClass({

	/*
	 propsだと値の読み取りはできるが、変更はできない
	 値を変更したい場合はstateを使用する。stateを使用するためにgetInitialStateで初期化する
	
	 componentDidMountメソッドでurl="/api/comments"の値をajaxで読み込む
	 ajaxはjQueryを使用して読み込む（htmlにCDNを追加）

	 メソッド外の値を「this.***」で使用する場合、thisは同一メソッド内の値の意味になるので
	 bind(this)を記載する。
	*/

	getInitialState: function(){
		return {data: []};
	},
	componentDidMount: function(){
		$.ajax({
			url : this.props.url,
			cache: true,
			dataType: 'json',
			success: function(data2){
				this.setState({data: data2});
			}.bind(this),
			error: function(){
				console.error(this.props.url);
			}.bind(this)
		});
	},
	handleCommentSubmit2: function(comment){
		console.log(comment);

		$.ajax({
			url : this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data){
				this.setState({data: data});
			}.bind(this),
			error: function(){
				console.error(this.props.url);
			}.bind(this)
		});

	},
	render: function() {
		return (
			<div className="CommentBox1">
			    <h1>コメント</h1>
				<CommentList data={this.state.data} />
                <CommentForm onCommentSubmit2={this.handleCommentSubmit2}/>
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

/*
 formタグの中に「onSubmit={this.handleSubmit}」を指定することでボタン押下時のイベントを定義
 handleSubmitメソッドでボタン押下時の処理を定義。
 「ventObject.preventDefault();」でsubmitボタン押下時のデフォルト処理を無効化
 getInitialStateメソッドでクラスオブジェクトの読み込み時の動作を定義

 onChangeプロパティの説明
 通常は入力フィールドからポインタが外れた時に発動する
 Reactの場合は入力フィールドの値が変更されるたびに発動する（一文字ずつのイメージ）

 イベントハンドラなので引数に[eventObject]を設定する
*/
var CommentForm = React.createClass({
	getInitialState: function(){
		return {
			author: '',
			text: ''
		};
	},
	handleAuthorChange: function(eventObject){
		this.setState({author: eventObject.target.value});
	},
	handleTextChange: function(eventObject){
		this.setState({text: eventObject.target.value});
	},
	handleSubmit: function(eventObject){
		eventObject.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();

		// エラーハンドリング
		if(!author || !text){
			return;
		}

		this.props.onCommentSubmit2({author: author, text: text});
		this.setState({author: '', text: ''});
	},
	render: function() {
		return (
			<form className="CommentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="名前" value={this.state.author} onChange={this.handleAuthorChange}/>
				<input type="text" placeholder="コメントを入力" value={this.state.text} onChange={this.handleTextChange}/>
				<input type="submit" value="送信" />
			</form>
		);
	}
});



// 第一引数：どのクラスから作ったものかを定義
// 第二引数：どこに差し込むのかを定義（HTML側で定義する）
ReactDOM.render(
	<CommentBox1 url="/api/comments" />,
	document.getElementById('content_1')
);