PUT http://localhost:4666/authors/{{id}}
Content-Type: application/json

[Options]
variable: id="5ed614ec-b3cb-4b37-9f19-4304e5574fd5"

#______________________________________________________________________________

# EXAMPLE: 1 => Updating all fields

# {
#   "name": "Nexus Legend",
#   "birthday": "1996-07-15"
# }

#______________________________________________________________________________

# EXAMPLE: 2 => Updating only the name field

{
  "name": "Eric Leonheart"
}

#______________________________________________________________________________

