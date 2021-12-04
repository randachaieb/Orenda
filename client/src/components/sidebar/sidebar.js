import React from "react";
import "./sidebar.css";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { CategoriesOffer, CategoriesPlaces } from "./categories-query";
class Sidebar extends React.Component {
    constructor() {
      super();
      this.state = {
        Categories:CategoriesPlaces,
        CategoriesFiltred:CategoriesPlaces,
        CategoriesOffer:CategoriesOffer,
        CategoriesOfferFiltred:CategoriesOffer
    ,ID:null,
    IDoffers:null,
    open:true,
    active:'s1',
    activeOffers:'s2',
    openOffers:true,

      };
    }

    
       handleChange = (e) => {
    
            let value = e.target.value.toLowerCase();
            let result = [];
            console.log(value);
            result = this.state.Categories.filter((data) => {
            return data.label.toLowerCase().search(value) != -1;
            });
            this.setState({CategoriesFiltred:result})
            console.log(result);
       }
       handleChangeOffers = (e) => {
    
        let value = e.target.value.toLowerCase();
        let result = [];
        console.log(value);
        result = this.state.CategoriesOffer.filter((data) => {
        return data.label.toLowerCase().search(value) != -1;
        });
        this.setState({CategoriesOfferFiltred:result})
        console.log(result);
   }
         handleClick = (e, index) => {
            this.setState({ID:index} )
            this.setState({open:!this.state.open} )
    
        }
        handleClickOffers= (e, index) => {
            this.setState({IDoffers:index} )
            this.setState({openOffers:!this.state.openOffers} )
    
        }
        addActiveClassOffers= (e,index) => {
            const click = e.target.id
            this.setState({IDoffers:index} )
         console.log(click);
         if(!this.state.activeOffers===click)
         {
            this.setState({activeOffers:''} )
            
         }
         else
         {
            this.setState({activeOffers:click
            } )
             
         }
         console.log(this.state.activeOffers);
     }
        addActiveClass = (e,index) => {
            const click = e.target.id
            this.setState({ID:index} )
         console.log(click);
         if(!this.state.active===click)
         {
            this.setState({active:''} )
            
         }
         else
         {
            this.setState({active:click
            } )
             
         }
         console.log(this.state.active);
     }
       render() {
      
         return (
                <div className='sidebar'>

<div className='side-top'>
    <span className='title-category'><i class="bi bi-tags-fill"></i> ALL CATEGORIES</span>
    <span className='length-category'>
    
   </span>
</div>

<div className='stky'>
    <span  className='title-c'>Places by category</span>

  
        <Input
          value={this.state.searchString} onChange={this.handleChange} 
          placeholder='Search...'
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
  
    <ul className='first'>
        {this.state.CategoriesFiltred.map((cat, index) =>
            <li id={index} className={`stky-li ${this.state.ID===index? 'category-list': ''}`} onClick={e=>this.addActiveClass(e, index) && cat.sublabel}>

                <div className='justify'>
                    
                    <span  className='' >  {cat.label}</span>
                  { this.state.open && cat.sublabel && this.state.ID===index ? <span>
                        <i class="bi bi-chevron-down" onClick={e => this.handleClick(e, index)}></i>
                    </span> :
                    cat.sublabel? <span>
                            <i class="bi bi-chevron-right" onClick={e => this.handleClick(e, index)}></i>
                    </span> :null
                    }
                </div>

                {
                    cat.sublabel && this.state.open && this.state.ID===index?
                        <ul key={index}>
                            {this.state.open && cat.sublabel.map((c, index) =>
                                <li className='show' key={index}>{c.label }</li>
                            )}
                         </ul> :null
                }
            </li>
        
      )}
    </ul>

    
	<span >Offers by category</span> 
    
    <Input
         value={this.state.searchString} onChange={this.handleChangeOffers}
          placeholder='Search...'
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />

    <ul className='first'>
        {this.state.CategoriesOfferFiltred.map((cat, index) =>
            <li id={cat.id} className={`stky-li ${this.state.IDoffers===index? 'category-list': ''}`} onClick={e=>this.addActiveClassOffers(e, index) && cat.sublabel}>

                <div className='justify'>
                    
                    <span  className='' >  {cat.label}</span>
                  { this.state.openOffers && cat.sublabel && this.state.IDoffers===index ? <span>
                        <i class="bi bi-chevron-down" onClick={e => this.handleClickOffers(e, index)}></i>
                    </span> :
                    cat.sublabel? <span>
                            <i class="bi bi-chevron-right" onClick={e => this.handleClickOffers(e, index)}></i>
                    </span> :null
                    }
                </div>

                {
                    cat.sublabel && this.state.openOffers && this.state.IDoffers===index?
                        <ul key={index}>
                            {this.state.openOffers && cat.sublabel.map((c, index) =>
                                <li className='show' key={index}>{c.label }</li>
                            )}
                         </ul> :null
                }
            </li>
        
      )}
    </ul>

</div>

</div>
       
         );
       }
    }
    
  
    
    export default Sidebar;