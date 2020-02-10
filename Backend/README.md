# Todo App with Django and React

## Backend:
   - django
   - django-rest-framework
   - django-rest-auth (token-based authentication)

利用Django建立RESTful API。  
**API** (Application Programming Interface)，應用程式介面，是一種接口，讓其他應用程式可以透過這個介面來和自身的系統溝通(例如存取data)。

**HTTP** (HyperText Transfer Protocol)，超文本傳輸協定，是針對網路client端和server端在發request及response的一種統一規範。  
<img src="../HTTP.PNG" width="200px">

**REST API** (Representational State Transfer)，具象化狀態傳輸，REST是Client跟Server端的一種呼叫形式，利用**HTTP** request method POST/GET/PUT/DELETE，針對單一的URL資源去做CRUD的操作。REST API的好處在於只有唯一一個URL資源，讓所有的request都是針對同一個API完成。REST API由三種元素組成:

1. Noun: URL資源位置
1. Verb: 對資源要做的動作
1. Content type: 資源呈現方式(e.g JSON)

```
一般API:
獲得資料GET   /getData
新增資料POST  /createData
刪除資料POST  /deleteData/1
```
```
REST API:
獲得資料GET     /data
新增資料POST    /data
刪除資料DELETE  /data/1
```

### Todo/Users API 建構流程:

1. **Define models**
1. **Define serializers**  
   使用`django-rest-framework`的serializer，將data轉換成python datatype後再轉換成JSON或XML等content types。使用ModelSerializer可以:
   - 基於相對應的model自動產生field
   - 自動包含一些內建的validator for deserialize
   - 已經包含default的`.create()`及`.save()`方法

1. **Define views**  
   Views使用`django-rest-framework`內建的`ModelViewSet` Class

1. **Define urls**

### Authentication API 建構流程:
1. 使用`django-rest-auth`



## Frontend:
---
   - react
   - react-router
   - redux
   - react-redux
   - redux-thunk
   - axios
   - react-modal
   - react-datepicker
   - webpack

### **路由**

**React Router**是用來建立前端路由。傳統上要讀取一個URL，要發request給server，server根據URL回傳相對應的頁面(html/js file)。但在使用了React Router這樣的client-side router後，只有第一次讀取頁面(包含refresh)時browser會發送request給server，之後路由就被React Router攔截，不會發request給server，而是利用browser API `history.PushState`來改變URL，並render出相對應的view。主要的組件:
- routers  
  - `<BrowserRouter>` 需要server端也有相對應的配置，意即server端的要把client端用到的所有URL都連結到同一個頁面。(不然頁面重刷送request給server就會page not found) `Create React App` supports this out of the box in development
  - `<HashRouter>` 把路由存在hash tag # 後面，這種方式後端不須有相對應的配置，因為 # 後的url不會被傳給server。
- route matchers 
   - `<Switch>`  
   - `<Route>` render method:
   
   ```JavaScript
   // Route component
   <Route exact path='/login' component={Login} />

   // Route render, 傳props給要render的component
   <Route exact path='/' render={(routeProps) => <MyTask {...routeProps} showInputModal={this.showInputModal} />} />

   // Route children, children類似render, 只是children不管位置合不合都會render, 只是位置合的話才會傳route props下去
   <Route 
      exact path={this.props.to}
      children={(props) => {
        let className = (props.match) ? 'active' : ''
        return (
          <li className={className}>
            <Link to={this.props.to}>{this.props.name}</Link>
          </li>
        )
      }}
      />
   ```
   
- route changers  
   `<Link>`, `<Redirect>`
- `<Prompt>` 會在使用者離開這個頁面時顯示message (message可以是一個function, 把它用來清除signup跟login的message)

### **狀態管理**
**Redux/React-redux**  
見react.md  

### 串接後端API
**axios**

### 用到的JS & CSS語法整理


**Frontend structure:**  
1. 使用`React Router`處理路由
   - 用`<HashRouter>`包住`<App />`。  
   - `<App />`內包含`<TopBlock />` & `<MainContent />`
