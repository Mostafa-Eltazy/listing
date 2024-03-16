import moment from 'moment';
import React from 'react';
import { Category } from '../lib/interfaces/category.interface';

const renderPlaceholders = (limit: number, placeholderComponent: React.ReactElement): React.ReactElement[] => {
  return new Array(limit).fill(null).map((comp, i) => {
    return React.cloneElement(placeholderComponent, { key: i });
  });
};

const computeCreatedAt = (createdAt: string): string => {
  const momentDate = moment(createdAt);
  const currentDate = moment();
    if (currentDate.diff(momentDate, 'days') > 30) {
    return `at ${momentDate.format('YYYY-MM-DD')}`; 
  } else {
    return momentDate.fromNow();
  }
};


const determineCategoryName = (categoryId: number, categories: Category[] | null): string => {

  if(categories){
    const category = categories.find((c)=> c.id === categoryId)
    return category?.name ?? '';
  }
  return ''
}

const formatPrice = (priceNumber: number): string => {

  if (!priceNumber) {
    return '';
  }
  const price = priceNumber.toString();
  const [integerPart, decimalPart] = price.split('.');

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const formattedPrice = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

  return `${formattedPrice} EGP`;
};

export { renderPlaceholders, computeCreatedAt,formatPrice, determineCategoryName };
