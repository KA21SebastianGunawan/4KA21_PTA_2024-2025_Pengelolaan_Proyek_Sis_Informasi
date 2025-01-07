import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";

const {DataTypes} = Sequelize;

const Dokumentasi = db.define('dokumentasi',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
           notEmpty: true
        }
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    judul:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           len: [3, 25]
        }
    },
    keterangan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
    }
},{
    freezeTableName: true
});

Users.hasMany(Dokumentasi);
Dokumentasi.belongsTo(Users, {foreignKey: 'userId'});

export default Dokumentasi;
