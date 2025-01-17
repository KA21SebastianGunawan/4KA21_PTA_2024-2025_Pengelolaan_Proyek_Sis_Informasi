import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";

const {DataTypes} = Sequelize;

const LaporanAdmin = db.define('laporanAdmin',{
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
    },
    bulan_pemeriksaan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           len: [3, 50]
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
    dokumen_laporan:{
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

Users.hasMany(LaporanAdmin);
LaporanAdmin.belongsTo(Users, {foreignKey: 'userId'});

export default LaporanAdmin;
