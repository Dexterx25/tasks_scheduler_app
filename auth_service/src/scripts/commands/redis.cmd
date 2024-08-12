redis-cli

KEYS *
##keys like this: access:ffae33e7-b045-453a-8030-72ae185ba4b2

GET access:cdd16819-81bb-42f7-b2c5-1bab2e49603c
## value saved within this key

TTL access:cdd16819-81bb-42f7-b2c5-1bab2e49603c
## duration seconds