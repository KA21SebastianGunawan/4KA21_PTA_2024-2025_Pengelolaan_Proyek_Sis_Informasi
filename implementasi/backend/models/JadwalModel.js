import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";

const {DataTypes} = Sequelize;

const JadwalPelayanan = db.define('jadwalPelayanan',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
           notEmpty: true
        }
    },
    rw:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    kategori:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           len: [3, 25]
        }
    },
    jadwal:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           isDate: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Users.hasMany(JadwalPelayanan);
JadwalPelayanan.belongsTo(Users, {foreignKey: 'userId'});

export default JadwalPelayanan;
