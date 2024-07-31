import CollapsableCard from '../../../utils/Cards/CollapsableCard/CollapsableCard'

import css from './ExploreOptionsNearMe.module.css';

let ExploreOptionsNearMe = () => {
    let chain = ['hyd', 'cheenai', 'vizag', 'hyd', 'cheenai', 'vizag', 'hyd', 'cheenai', 'vizag', 'hyd', 'cheenai', 'vizag', 'hyd', 'cheenai', 'vizag', 'hyd', 'cheenai', 'vizag', 'hyd', 'cheenai', 'vizag', 'hyd', 'cheenai', 'vizag', 'hyd', 'cheenai', 'vizag']
    let chain2 = ['Bakery food near me', 'Beverages food near me', 'Biryani food near me', 'Burger food near me', 'Chinese food near me', 'Coffee food near me', 'Continental food near me', 'Desserts food near me', 'Italian food near me', 'Mithai food near me', 'Momos food near me', 'Mughlai food near me', 'North Indian food near me', 'Pasta food near me', 'Pizza food near me', 'Rolls food near me', 'Sandwich food near me', 'Shake food near me', 'South Indian food near me', 'Street food near me']
    let chain3 = ['Bakeries near me', 'Bars near me', 'Beverage Shops near me', 'Bhojanalya near me', 'Cafés near me', 'Casual Dining near me', 'Clubs near me', 'Cocktail Bars near me', 'Confectioneries near me', 'Dessert Parlors near me', 'Dhabas near me', 'Fine Dining near me', 'Food Courts near me', 'Food Trucks near me', 'Irani Cafes near me', 'Kiosks near me', 'Lounges near me', 'Meat Shops near me', 'Microbreweries near me', 'Paan Shop near me', 'Pubs near me', 'Quick Bites near me', 'Sweet Shops near me']
    let chain4 = ["Bikanervala", "Biryani Blues", "BTW", "Burger King", "Burger Singh", "Domino's",  "Dunkin Donuts", "Haldiram's", "KFC", "Krispy Kreme", "McDonald's", "Moti Mahal Delux", "Om Sweets & Snacks", "Pizza Hut", "Sagar Ratna", "Subway", "WOW! Momo"]
    return <div className={css.outerDiv}>
        <div className={css.innerDiv}>
            <div className={css.title}>Explore options near me</div>
            <div className={css.cards}>
                <CollapsableCard title="Popular cuisines near me" content={chain2} />
                <CollapsableCard title="Popular restaurant types near me" content={chain3} />
                <CollapsableCard title="Top Restaurant Chains" content={chain4} />
                <CollapsableCard title="Cities We Deliver To" content={chain} />
            </div>
        </div>
    </div>
}

export default ExploreOptionsNearMe;