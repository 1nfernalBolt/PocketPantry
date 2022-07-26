const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema of what a user has
const userSchema = mongoose.Schema(
  {
    First_name: {
      type: String,
      required: true,
    },
    Last_name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    Saved_recipes: {
      type: [
        {
          RecipeId: {
            type: Number,
            required: true,
          },
          Name: {
            type: String,
            required: true,
          },
          RecipeDesc: {
            type: String,
            required: true,
          },

          instructions: {
            type: String,
            required: false,
          },
          Image: {
            type: String,
            required: false,
          },
          ingredients: {
            type: [
              {
                id: {
                  type: Number,
                  required: true,
                },
                name: {
                  type: String,
                  required: true,
                },
                aisle: {
                  type: String,
                  required: false,
                },
                image: {
                  type: String,
                  required: false,
                },
                amount: {
                  type: Number,
                  required: false,
                },
                unit: {
                  type: String,
                  required: false,
                },
                originalName: {
                  type: String,
                  required: false,
                },
                original: {
                  type: String,
                  required: false,
                },
                nameClean: {
                  type: String,
                  required: false,
                },
                consistency: {
                  type: String,
                  required: false,
                },
                measures: {
                  type: [
                    {
                      metric: {
                        type: [
                          {
                            amount: {
                              type: Number,
                              required: false,
                            },
                            unitLong: {
                              type: String,
                              required: false,
                            },
                            unitShort: {
                              type: String,
                              required: false,
                            },
                          },
                        ],
                        required: false,
                      },
                      us: {
                        type: [
                          {
                            amount: {
                              type: Number,
                              required: false,
                            },
                            unitLong: {
                              type: String,
                              required: false,
                            },
                            unitShort: {
                              type: String,
                              required: false,
                            },
                          },
                        ],
                        required: false,
                      },
                    },
                  ],
                  required: true,
                },
                meta: {
                  type: [{}],
                  required: true,
                },
              },
            ],
            required: false,
          },
        },
      ],
      required: true,
    },
    Shopping_list: {
      type: [
        {
          IngredientId: {
            type: Number,
            required: true,
          },
          Name: {
            type: String,
            required: true,
          },
          Image: {
            type: String,
            required: true,
          },
          Amount: {
            type: Number,
            required: true,
          },
          Unit: {
            type: String,
            required: true,
          },
          Checked: {
            type: Boolean,
            required: false,
          },
        },
      ],
      required: true,
    },
    Pantry: {
      type: [
        {
          IngredientId: {
            type: Number,
            required: true,
          },
          Name: {
            type: String,
            required: true,
          },
          Image: {
            type: String,
            required: true,
          },
          Amount: {
            type: Number,
            required: true,
          },
          Unit: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypts password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
});

// Compares password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

// Link "User" to the schema and export
const User = mongoose.model("User", userSchema);

module.exports = User;