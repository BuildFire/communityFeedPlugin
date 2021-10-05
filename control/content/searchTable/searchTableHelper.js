class SearchTableHelper{
	constructor(tableId,tag,config){
		if(!config) throw "No config provided";
		if(!tableId) throw "No tableId provided";
		this.table = document.getElementById(tableId);
		if(!this.table) throw "Cant find table with ID that was provided";
		this.config = config;
		this.tag=tag;
		this.sort={};
		this.commands = {};
		this.numOfRows = 0;
		this.init();
	}

	init(){
		this.table.innerHTML="";
		this.renderHeader();
		this.renderBody();
	}

  renderHeader() {
		if(!this.config.columns) throw "No columns are indicated in the config";
		this.thead = this._create('thead',this.table);
		this.config.columns.forEach(colConfig=>{
			let classes = [];
			if(colConfig.type == "date") classes=["text-center"];
			else if(colConfig.type == "number") classes=["text-right"];
			else classes=["text-left"];

			let th = this._create('th',this.thead,colConfig.header,classes);
			if(colConfig.sortBy) {
				const icon = this._create('span', th, "", ['icon', 'icon-chevron-down','hidden']);
				const _t = this;
				th.addEventListener('click', function () {
					let span = this.children[0];
					
					if(_t.sort[colConfig.sortBy] && _t.sort[colConfig.sortBy] > 0) {
						_t.sort = {[colConfig.sortBy] : -1};
						icon.classList.remove('icon-chevron-up');
						icon.classList.add('icon-chevron-down');
					}
					else {
						//revert icon if previously sorted
						for (let i = 0; i < _t.thead.children.length; i++) {
							if(_t.thead.children[i].children[0]) {
								_t.thead.children[i].children[0].classList.add('hidden');
								_t.thead.children[i].children[0].classList.remove('icon-chevron-up');
								_t.thead.children[i].children[0].classList.add('icon-chevron-down');

							}
						};
						_t.sort = {[colConfig.sortBy] : 1};
						 icon.classList.remove('icon-chevron-down');
						 icon.classList.add('icon-chevron-up');
					}
					span.classList.remove("hidden")
					_t.endReached = false;
					_t.tbody.scrollTop = 0;
					_t.numOfRows = 0;
					_t.fetchingNextPage = false
					_t._fetchPageOfData(0);
				});
			}
			if(colConfig.width) th.style.width = colConfig.width;
		});



		if(this.config.options.showDeleteButton) this._create('th',this.thead,"",["deleteColumn"]);
	}

	renderBody(){
		this.tbody = this._create("tbody",this.table);
		let t = this;
		this.tbody.onscroll=e=>{
			if(t.tbody.scrollHeight - t.tbody.scrollTop - t.tbody.clientHeight < 1){
				t._fetchNextPage();
			}
		};
	}

	search(filter){
		this.tbody.innerHTML='';
		this._create('tr',this.tbody,'<td colspan="99"> searching...</td>',["loadingRow"],"loadingrow");
		this.filter=filter;
		this._fetchPageOfData(this.numOfRows);
	}

	_fetchNextPage(){
        console.log("FETCHING NEXT PAGE");
		if(this.fetchingNextPage) return;
		this.fetchingNextPage=true;
		let t=this;
		this._fetchPageOfData(this.tbody.childNodes.length,()=>{
			t.fetchingNextPage = false;
            console.log("FALSE FETCHING NEXT PAGE");
		});
	}

	_fetchPageOfData(skip,callback){
        // this.setTableLoading(true);
        console.log("this.endReached");
        console.log(this.endReached);
        if(skip > 0 && this.endReached) return;
        this.skip = skip;
        let options = {
            sort: this.sort,
            skip: this.skip,
        }
        this.searchOptions = options;
        let displayName = document.getElementById("title").value;
        Posts.searchPublicPosts({skip, sort:this.sort, displayName: displayName ? displayName : ""},(err, r) =>{
            // this.setTableLoading(true);
            if(err) return console.error(err);
            else if(r && r.length == 0){
                if(skip == 0) this.noPostsExists();
                else this.endReached = true;
                console.log("CHANGING THIS END REACHED TO TRUE");
            }
            else{
                if(document.getElementById("noPostsExists")) document.getElementById("noPostsExists").style.display = "none";
                if(this.tbody.style.display = "none") this.tbody.style.display = "block";
                // this.setTableLoading(false)
                if(skip == 0) this.tbody.innerHTML = "";
                r.forEach(r=>this.renderRow(r));
                if(callback)callback();
            }
        })



	}

	

	_onCommand(obj, tr, command){
		if(this.commands[command]){
			this.commands[command](obj,tr)
		}
	}

	renderRow(obj,tr){
		if(tr) tr.innerHTML='';
		else tr = this._create('tr',this.tbody);
		tr.setAttribute("objId",obj.id);
		this.config.columns.forEach(colConfig=>{
				let classes = [];
				if(colConfig.type == "date") classes=["text-center"];
				else if(colConfig.type == "number") classes=["text-right"];
				else classes=["text-left"];

				var td;
				if(colConfig.type == "command"){
					td =this._create('td', tr, '<button class="btn btn-link">' + colConfig.text + '</button>', ["editColumn"]);
					td.onclick=(event)=>{
						event.preventDefault();
					};
				} else {
					var output = ""
					try {
						///needed for the eval statement next
						var data = obj.data;
						output = eval("`" + colConfig.data + "`");
					} catch (error) {

					}
					td=this._create('td',tr,output,classes);
					td.onclick=()=>{
						
						buildfire.history.push(td.parentElement.getAttribute("objid"));
						window.location.href="./components/editPost.html";
					}
				}
				if(colConfig.width)
						td.style.width = colConfig.width;
			
		});

		let t=this;
		if(this.config.options.showEditButton) {
			let td =this._create('td', tr, '<button class="btn btn--icon"><span class="icon icon-pencil"></span></button>', ["editColumn"]);
			td.onclick=()=>{
				t.onEditRow(obj,tr);
			};
		}

		if(this.config.options.showDeleteButton) {
			let td = this._create('td', tr, '<button class="btn btn--icon"><span class="icon icon-cross2"></span></button>', ["editColumn"]);
			let t = this;
			td.onclick=()=>{
				buildfire.notifications.confirm({
					title:"Are you sure?"
					,message:"Are you sure you want to delete this post?"
					,confirmButton: {text: 'Yes', key:'yes', type: 'danger'}
					,cancelButton: {text: 'No', key:'no', type: 'default'}
				},function(e,data){
					if(data.selectedButton.key =="yes") {
                        t.endReached = false;
						tr.classList.add("hidden");
						Posts.deletePublicPost(obj.id,(e,r)=>{
							if(e)
								tr.classList.remove("hidden");
							else{
								t.onRowDeleted(obj,tr);
								t._fetchPageOfData(0)
							}
						});

					}
				});

			};
		}
		// this.onRowAdded(obj,tr);
	}

	onSearchSet(options){
		return options;
	}

	onEditRow(obj,tr){
	}

	onRowDeleted(obj,tr){
		if(this.tbody.childNodes.length == 0){
			this.noPostsExists();
		}
	}

	onCommand(command, cb){
		this.commands[command] = cb;
	}

	_create(elementType,appendTo,innerHTML,classNameArray,id = ""){
		let e = document.createElement(elementType);
		if(innerHTML) e.innerHTML = innerHTML;
		if(Array.isArray(classNameArray))
			classNameArray.forEach(c=>e.classList.add(c));
		if(appendTo) appendTo.appendChild(e);
		if(id) e.setAttribute("id",id)
		return e;
	}

	noPostsExists(){
		this.tbody.innerHTML = "";
		if(document.getElementById("noPostsExists")){
			document.getElementById("noPostsExists").style.display = "flex";
		}
		else{
			this._create("div",this.tbody,"No items found.",["noPostsExistsTable"],"noPostsExists");
		}
	}

}