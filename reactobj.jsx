var objectNamn1 = document.getElementById("objectNamn1");
var objectNamn2 = document.getElementById("objectNamn2");
/******* APP COMPONENT ***********/
var Lista = []

class App extends React.Component {
    constructor(props){
        super(props); // basklassens konstruktor
        this.state = {
           Lista: Lista,
            namn1: '',
            namn2: '',
            id: Lista.length
        }
        this.updateInputElements = this.updateInputElements.bind(this);
        this.addElementToList = this.addElementToList.bind(this);
        this.clicked = this.clicked.bind(this);
    }
    render(){
        return (<div>
                <h1>Skriv in ett namn</h1>
            <div id="Form">
                <AdForm updateInputElements={this.updateInputElements}
                    addElementToList={this.addElementToList} namn1={this.state.namn1} namn2={this.state.namn2}/>
            </div>
            <div id="Lista">
              <MyList lista={this.state.Lista} clickFunction={this.clicked} />
                
            </div>
            </div>);
    }
    
         clicked(event) {
          
            var span1 = event.target.parentNode.childNodes[0].innerText;
            var span2 = event.target.parentNode.childNodes[1].innerText;
              console.log(span1, span2);
               this.updateInputElements(span1, span2);
        }
    
    updateInputElements(i1, i2){
        console.log(i1, i2);
        this.setState({namn1: i1, namn2: i2})
    }
    addElementToList(object){
        const newList = this.state.Lista.slice();
        newList.push(object);
        this.setState ({Lista: newList,
                       id: object.id + 1})
        
    
    }
}
class AdForm extends React.Component {
     constructor(props){
        super(props); 
         this.namn1Change = this.namn1Change.bind(this);
         this.namn2Change = this.namn2Change.bind(this);
         this.buttonClicked = this.buttonClicked.bind(this);
        this.state = {
            namn1: '',
            namn2: ''
        };
     }
         
    render(){
        return(  <div>
                <input type="text" id="objectNamn1" onChange={this.namn1Change} value={this.props.namn1} placeholder="Förnamn"/><br/>
                <input type="text" id="objectNamn2" onChange={this.namn2Change} value={this.props.namn2} placeholder="Efternamn"/><br/>
                <button onClick={this.buttonClicked}>Lägg till</button>
            </div>);
    }
         
    namn1Change(event){
      this.props.updateInputElements(event.target.value, this.state.namn2)
      this.setState({namn1: event.target.value})
      
    }
     namn2Change(event){
       this.props.updateInputElements(this.state.namn1, event.target.value)
      this.setState({namn2: event.target.value})
    }
     buttonClicked(event){
       this.props.addElementToList({namn1: this.state.namn1, namn2: this.state.namn2})
    }
    
}
class MyList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedItem: null
        }
        this.updateSelectedItem = this.updateSelectedItem.bind(this);
    }
        render(){
           const list = this.props.lista;
            const newList = list.map(
         object => ( <MyItem data={object} clickFunction={this.props.clickFunction} />));
             console.log("listan: " + newList);
        return( 
            <ul id="unorderedList">{newList}</ul>   
        );  
    }  
    
    updateSelectedItem(){
    }
}
class MyItem extends React.Component {
    render() {
            return <li key={this.props.data.id} id={this.props.data.id} onClick={this.props.clickFunction}><span>{this.props.data.namn1}</span><span>{this.props.data.namn2}</span></li>;
            };          
}
ReactDOM.render(
    <App />, 
    document.getElementById('app-root')
)








