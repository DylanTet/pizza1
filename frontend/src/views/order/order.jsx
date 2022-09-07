import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './order.css'
import { margheritaPizza, pepPizza, buffPizza, bbqPizza } from "../../components/pizza-objects";
import axios from 'axios'

const Order = () => {

    const serverUrl = process.env.REACT_APP_AUTH0_SERVER_URL

    const { getAccessTokenSilently, user, checkSession } = useAuth0();

    async function sendOrder(pizza) {

        try {
            const token = await getAccessTokenSilently()

            axios({
                method: "post",
                url: `http://localhost:6060/api/order`,
                headers: {
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json'
                },
                body: {pizzaType: pizza}
                
            })
            .then(function (response){
                console.log(response)
                alert("Thank you for your order!")
            })
            

        } catch(err) {
            console.log(err)
            alert("Uh-oh! Your order couldn't be submitted")
        }

    }


        return(
            <div>
                { !user.email_verified && (
                    <div className="email">
                        <h2 className="email-title">Please verify your email to place an order!</h2>
                    </div>
                )

                }
                <div class="row row-cols-1 row-cols-md-2 g-4">
                    <div class="col">
                        <div class="card">
                            <img src="https://cookieandkate.com/images/2021/07/classic-margherita-pizza.jpg" class="card-img-top" />
                            <div class="card-body">
                                <h5 class="card-title">{margheritaPizza.name}</h5>
                                {user.email_verified &&
                                    <button type="button" class="btn btn-primary" onClick={() => sendOrder(margheritaPizza.name)}>Place Order</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <img src="https://www.simplyrecipes.com/thmb/RiK7px2b_-buGiK2w55_jdRiAKM=/1333x1333/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-8f256746d649404baa36a44d271329bc.jpg" class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">{pepPizza.name}</h5>
                                { user.email_verified && (
                                    <button type="button" class="btn btn-primary" onClick={() => sendOrder(pepPizza.name)}>Place Order</button>
                                )}                        
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190226-buffalo-chicken-pizza-370-1552084943.jpg" class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">{buffPizza.name}</h5>
                                { user.email_verified && (
                                    <button type="button" class="btn btn-primary" onClick={() => sendOrder(buffPizza.name)}>Place Order</button>
                                )}                        
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <img src="https://www.budgetbytes.com/wp-content/uploads/2020/06/BBQ-Chicken-Pizza-one-slice.jpg" class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">{bbqPizza.name}</h5>
                                { user.email_verified && (
                                    <button type="button" class="btn btn-primary" onClick={() => sendOrder(bbqPizza.name)}>Place Order</button>
                                )}                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
}

export default Order;