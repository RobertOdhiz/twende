import express from 'express';
import { protectRoute, restrictTo } from '../middlewares/auth.middleware.js';
import companyController from '../controllers/company.controllers.js';

const CompanyRoutes = express.Router();

// Route to create a new company (restricted to admin)
CompanyRoutes.post('/', protectRoute, restrictTo('admin'), companyController.createCompany);

// Route to retrieve all companies (accessible to all authenticated users)
CompanyRoutes.get('/', protectRoute, restrictTo('admin'), companyController.getAllCompanies);

// Route to retrieve a specific company by ID (accessible to all authenticated users)
CompanyRoutes.get('/:id', protectRoute, restrictTo('admin'), companyController.findCompanyById);

// Route to update an existing company (restricted to admin)
CompanyRoutes.put('/:id', protectRoute, restrictTo('admin'), companyController.updateCompany);

// Route to delete a company (restricted to admin)
CompanyRoutes.delete('/:id', protectRoute, restrictTo('admin'), companyController.deleteCompany);

export default CompanyRoutes;
