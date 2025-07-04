package org.configuration.em_project;

import java.util.List;

public interface EmployeeService {
    String createEmployee(Employee employee);

    List<Employee> readEmployees();

    boolean deleteEmployee(Long id);

    boolean updateEmployee(Long id, Employee employee);

    Employee readEmployee(Long id);

}
