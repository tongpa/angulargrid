import {Component, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MdPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge'; 
import 'rxjs/add/observable/of'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/startWith'; 
import 'rxjs/add/operator/switchMap'; 

import {Http, Headers, RequestOptions, Response} from '@angular/http';
//import {HttpClientModule, HttpRequest, HttpClient} from '@angular/common/http';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'table-pagination-example',
  styleUrls: ['/javascript/angular-grid-page/table-pagination-example.css'],
  templateUrl: '/javascript/angular-grid-page/table-pagination-example.html',
})
export class TablePaginationExample {
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource: ExampleDataSource | null;
  //dataSource: MyDataSource | null;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  //httpCall : Http:null;
  constructor(private http: Http) {
	  //this.httpCall = http;
	  
  }
  
  
  public callData( paginator: MdPaginator){
		//console.log("call Data 1");
		console.log(paginator);
		console.log('PageSize : ' + paginator.pageSize);
		console.log('pageIndex : ' + paginator.pageIndex);
		console.log('startIndex : ' + paginator.pageIndex * paginator.pageSize);
		
		let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		const body = {pageSize: 25,
						pageIndex : paginator.pageIndex,
						startIndex : paginator.pageIndex * paginator.pageSize};
		this.http.post('//192.168.1.72:8581/angular_data',body,options)
	  .map((res: Response) => res.json())
	  .subscribe( res => {
		  console.log(res);
		  console.log(res.data);
		  //this.dataSource = new MyDataSource(res.data);
		  
		  
	  });
		
	}
  
  
  ngOnInit() {
	 // this.callData(this.paginator);
    //this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator , this.http);
	
	this.exampleDatabase = new ExampleHttpDao(this.http);
	this.dataSource = new ExampleDataSource( this.exampleDatabase!, this.paginator );
  
  }
}

export interface GithubApi { 
   data: UserData[]; 
   total: number; 
   success:boolean;
 } 


export class ExampleHttpDao { 
   constructor(private http: Http) {} 
 
 //pageSize: paginator.pageSize, pageIndex : paginator.pageIndex
   getRepoIssues(pageSize: number, pageIndex: number): Observable<GithubApi> { 
     const href = '/sample/angular_data'; 
     
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	const body = {pageSize: pageSize,
						pageIndex : pageIndex,
						startIndex : pageSize * pageIndex};
	
		
 
     return this.http.post(href,body,options)
                     .map(response => response.json() as GithubApi); 
   } 
 } 


 
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

export class ExampleDataSource extends DataSource<UserData> {
	resultsLength = 0; 
   isLoadingResults = false; 
   isRateLimitReached = false; 

  constructor(	private _exampleDatabase: ExampleHttpDao, 
				private _paginator: MdPaginator) {
    super();
  }
	
	
	connect(): Observable<UserData[]> { 
     const displayDataChanges = [this._paginator.page,];
 
 
     // If the user changes the sort order, reset back to the first page. 
    // this.sort.mdSortChange.subscribe(() => this._paginator.pageIndex = 0); 
 
 
     return Observable.merge(...displayDataChanges)
       .startWith(null) 
       .switchMap(() => { 
         this.isLoadingResults = true; 
         return this._exampleDatabase.getRepoIssues( this._paginator.pageSize, this._paginator.pageIndex); 
       })   //pageSize: paginator.pageSize, pageIndex : paginator.pageIndex
       .map(data => { 
         // Flip flag to show that loading has finished. 
         this.isLoadingResults = false; 
         this.isRateLimitReached = false; 
         this.resultsLength = data.total; 
 
 
         return data.data; 
       }) 
       .catch(() => { 
         this.isLoadingResults = false; 
         // Catch if the GitHub API has reached its rate limit. Return empty data. 
         this.isRateLimitReached = true; 
         return Observable.of(null); 
       }); 
   }

  disconnect() {}
}
