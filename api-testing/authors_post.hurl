POST http://localhost:4666/authors
Content-Type: application/json
#______________________________________________________________________________

# EXAMPLE: 1 => Valid request

# {
#   "name": "Kendal",
#   "birthday": "1996-07-15"
# }

#______________________________________________________________________________

# EXAMPLE: 2 => Missing birthday field

{
  "name": "Hank Henshaw"
}

#______________________________________________________________________________

# HTTP 201
#
# [Asserts]
# jsonpath "$.id" exists
# jsonpath "$.name" == "Kate Kendal"
# jsonpath "$.birthday" == "1996-07-15"
