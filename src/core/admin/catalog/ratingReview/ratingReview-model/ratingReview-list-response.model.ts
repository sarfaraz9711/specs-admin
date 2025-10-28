/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class RatingReviewListResponseModel {
  public productId: number;
  public imagePath: string;
  public createdDate: string;
  public firstName: string;
  public image: string;
  public lastName: string;
  public name: string;
  public rating: number;
  public review: string;
  public isActive: number;
  public ratingId: number;
  public reviewImages: any;
  public isCommentApproved: number;


  constructor(ratingReviewlistResponse: any) {
    this.productId = ratingReviewlistResponse.productId || 0;
    this.imagePath = ratingReviewlistResponse.imagePath || '';
    this.createdDate = ratingReviewlistResponse.createdDate || '';
    this.firstName = ratingReviewlistResponse.firstName || '';
    this.image = ratingReviewlistResponse.image || '';
    this.lastName = ratingReviewlistResponse.lastName || '';
    this.name = ratingReviewlistResponse.productName || '';
    this.rating = ratingReviewlistResponse.rating || 0;
    this.review = ratingReviewlistResponse.review || '';
    this.isActive = ratingReviewlistResponse.isActive || 0;
    this.ratingId = ratingReviewlistResponse.ratingId || 0;
    this.reviewImages = ratingReviewlistResponse.reviewImages||[];
    this.isCommentApproved = ratingReviewlistResponse.isCommentApproved || 0;

  }
}
