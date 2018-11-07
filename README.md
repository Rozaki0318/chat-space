# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation
Prime key and timestamps are not written in the tables below. Those columns are created by default.

## users table

|Column|Type|Options|
|------|----|-------|
|user_name|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups,through: :members
- has_many :messages

## groups table

|Column|Type|Options|
|------|----|-------|
|group_name|varchar(255)|null: false|

### Association
- has_many :users,through: :members
- has_many :messages

## messages table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|content|text| |
|image|string| |

### Association
- belongs_to :group
- belongs_to :user

## members table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
