import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import styles from './Styles';

const HomeScreen = () => {

    const [products, setProducts] = useState([]);
    const [productsText, setProductsText] = useState('');


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsSnapshot = await firestore().collection('products').get();

                const productData = productsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        ...data,
                        id: doc.id,
                    };
                });
                
                const filteredProducts = productData.filter(Boolean);

                setProducts(filteredProducts);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, []);
}