"use client"

import React from "react";

const Posts: React.FC<ProfileProps>= ({ user, products }) => {
    
    return (
        <div>
            {products.map((product, i) => {
                return (
                    <div className="posts" key={i}>
                        <div className="f-card" >
                            <div className="header2">
                                <div className="options"><i className="fa fa-chevron-down"></i></div>
                                <img className="co-logo" src={user.imgUrl} />
                                <div className="co-name"><a href="#">{user.username}</a></div>
                                <div className="time"><a href="#">{user.createdAt}</a> · <i className="fa fa-globe"></i></div>
                            </div>
                            <div className="content">
                                <p>{product.description}</p>
                            </div>
                            <div className="reference">
                                <img className="reference-thumb" src={product.imageUrl} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts