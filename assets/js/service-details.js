const serviceContent = {
    'recharge': {  // Main service ID
        title: 'Recharge & Voucher Management',
        image: 'assets/img/working-1.jpg',  // Main service image
        description: 'Comprehensive solution for managing prepaid services, vouchers, and recharge operations with advanced security features.',
        // Main service features
        features: [
            {
                title: 'Real-time Processing',
                icon: 'bi-lightning',
                content: 'Instant transaction processing with features:\n' +
                        '• Instant balance updates\n' +
                        '• Real-time validation\n' +
                        '• Transaction monitoring'
            }
        ],
        // Sub-services content
        subServices: {
            'voucher': {  // Sub-service ID
                title: 'Voucher System',
                description: 'Complete voucher lifecycle management system.',
                features: [
                    {
                        title: 'Voucher Generation',
                        icon: 'bi-qr-code',
                        content: '• Secure batch generation\n' +
                                '• Multiple denomination support\n' +
                                '• Serial number management'
                    }
                ]
            },
            'topup': {
                title: 'Top-up Services',
                description: 'Manage top-up operations efficiently.',
                features: [
                    {
                        title: 'Instant Top-up',
                        icon: 'bi-lightning',
                        content: '• Quick top-up processing\n' +
                                '• Multiple payment options\n' +
                                '• User-friendly interface'
                    }
                ]
            },
            'billing': {
                title: 'Billing Integration',
                description: 'Seamless integration with billing systems.',
                features: [
                    {
                        title: 'Automated Billing',
                        icon: 'bi-file-earmark-text',
                        content: '• Scheduled billing cycles\n' +
                                '• Invoice generation\n' +
                                '• Payment tracking'
                    }
                ]
            }
        }
    },
    
    // Example of another main service
    'partner': {
        title: 'Partner Management',
        image: 'assets/img/working-2.jpg',
        description: 'Complete partner lifecycle management system.',
        features: [
            {
                title: 'Partner Onboarding',
                icon: 'bi-person-plus',
                content: '• Digital documentation\n' +
                        '• Automated verification\n' +
                        '• Profile management'
            }
        ],
        subServices: {
            'onboarding': {
                title: 'Partner Onboarding',
                description: 'Streamlined partner onboarding process.',
                features: [
                    {
                        title: 'Documentation Management',
                        icon: 'bi-file-text',
                        content: '• Digital document collection\n' +
                                '• Automatic document verification\n' +
                                '• Compliance checking'
                    }
                ]
            },
            'commission': {
                title: 'Commission Management',
                description: 'Manage partner commissions effectively.',
                features: [
                    {
                        title: 'Commission Tracking',
                        icon: 'bi-file-earmark-text',
                        content: '• Real-time commission tracking\n' +
                                '• Automated calculations\n' +
                                '• Reporting tools'
                    }
                ]
            },
            'reporting': {
                title: 'Partner Reporting',
                description: 'Generate reports for partner performance.',
                features: [
                    {
                        title: 'Performance Reports',
                        icon: 'bi-bar-chart',
                        content: '• Detailed performance analytics\n' +
                                '• Custom report generation\n' +
                                '• Export options'
                    }
                ]
            }
        }
    },
    'mediation': {
        title: 'Mediation System',
        image: 'assets/img/working-3.jpg',
        description: 'Advanced mediation platform for processing and managing network data and transactions.',
        features: [
            {
                title: 'Data Collection',
                icon: 'bi-database',
                content: 'Efficient data gathering:\n' +
                        '• Multi-source collection\n' +
                        '• Format conversion\n' +
                        '• Data validation\n' +
                        '• Error handling\n' +
                        '• Real-time processing'
            },
            {
                title: 'Processing Rules',
                icon: 'bi-gear',
                content: 'Flexible rule configuration:\n' +
                        '• Custom rule creation\n' +
                        '• Rule chaining\n' +
                        '• Priority settings\n' +
                        '• Version control\n' +
                        '• Testing tools'
            },
            {
                title: 'Output Management',
                icon: 'bi-arrow-up-right',
                content: 'Comprehensive output handling:\n' +
                        '• Multiple format support\n' +
                        '• Delivery scheduling\n' +
                        '• Error recovery\n' +
                        '• Archive management\n' +
                        '• Audit logging'
            }
        ]
    },
    'oss': {
        title: 'OSS Management',
        image: 'assets/img/working-4.jpg',
        description: 'Operations Support System for efficient network and service management.',
        features: [
            {
                title: 'Network Monitoring',
                icon: 'bi-activity',
                content: 'Real-time network oversight:\n' +
                        '• Performance monitoring\n' +
                        '• Fault detection\n' +
                        '• Alert management\n' +
                        '• Resource tracking\n' +
                        '• Capacity planning'
            },
            {
                title: 'Service Provisioning',
                icon: 'bi-hdd-network',
                content: 'Automated service management:\n' +
                        '• Service activation\n' +
                        '• Resource allocation\n' +
                        '• Configuration management\n' +
                        '• Change control\n' +
                        '• Service testing'
            },
            {
                title: 'Quality Assurance',
                icon: 'bi-check-circle',
                content: 'Service quality management:\n' +
                        '• SLA monitoring\n' +
                        '• Quality metrics\n' +
                        '• Performance reports\n' +
                        '• Issue resolution\n' +
                        '• Customer feedback'
            }
        ]
    }
};

// Function to update content based on service type and sub-service
function updateServiceContent(serviceType, subService = null) {
    const service = serviceContent[serviceType] || {};
    if (!service) return;

    // Update breadcrumb
    const breadcrumbs = document.querySelector('.breadcrumbs ol');
    breadcrumbs.innerHTML = `
        <li><a href="index.html">Home</a></li>
        <li><a href="#" data-service="${serviceType}">${service.title}</a></li>
        ${subService ? `<li class="current">${service.subServices[subService].title}</li>` : ''}
    `;

    // Update content
    const content = document.querySelector('.service-content');
    if (subService && service.subServices[subService]) {
        const subServiceData = service.subServices[subService];
        content.innerHTML = `
            <h2>${subServiceData.title}</h2>
            <p>${subServiceData.description}</p>
            <div class="features mt-5">
                ${subServiceData.features.map(feature => `
                    <div class="feature-item" data-aos="fade-up">
                        <div class="icon"><i class="bi ${feature.icon}"></i></div>
                        <h3>${feature.title}</h3>
                        <p>${feature.content}</p>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        content.innerHTML = `
            <img src="${service.image}" alt="${service.title}" class="img-fluid">
            <h2>${service.title}</h2>
            <p>${service.description}</p>
            <div class="features mt-5">
                ${service.features.map(feature => `
                    <div class="feature-item" data-aos="fade-up">
                        <div class="icon"><i class="bi ${feature.icon}"></i></div>
                        <h3>${feature.title}</h3>
                        <p>${feature.content}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Update active states
    document.querySelectorAll('.services-list a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.service === serviceType && 
            (!subService || link.dataset.sub === subService)) {
            link.classList.add('active');
        }
    });
}

// Get service type and sub-service from URL parameters
function getServiceFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service') || 'recharge';
    const subService = params.get('sub');
    return { service, subService };
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set up click handlers for service links
    document.querySelectorAll('.services-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const service = e.currentTarget.dataset.service;
            const subService = e.currentTarget.dataset.sub;
            
            // Update URL without page reload
            const url = new URL(window.location);
            url.searchParams.set('service', service);
            if (subService) {
                url.searchParams.set('sub', subService);
            } else {
                url.searchParams.delete('sub');
            }
            window.history.pushState({}, '', url);

            // Update content
            updateServiceContent(service, subService);

            // Move highlight to clicked service
            const highlightEl = document.querySelector('.service-highlight') || document.createElement('div');
            highlightEl.className = 'service-highlight';
            
            // Get the clicked link's position and dimensions
            const linkRect = e.currentTarget.getBoundingClientRect();
            const containerRect = e.currentTarget.closest('.services-list').getBoundingClientRect();
            
            // Set highlight position
            highlightEl.style.top = (linkRect.top - containerRect.top) + 'px';
            highlightEl.style.left = (linkRect.left - containerRect.left) + 'px';
            highlightEl.style.width = linkRect.width + 'px';
            highlightEl.style.height = linkRect.height + 'px';
            
            // Add highlight to container if it's not already there
            if (!highlightEl.parentElement) {
                e.currentTarget.closest('.services-list').appendChild(highlightEl);
            }
        });
    });

    // Toggle sub-services visibility
    document.querySelectorAll('.main-service > a').forEach(link => {
        link.addEventListener('click', (e) => {
            const mainService = e.currentTarget.closest('.main-service');
            document.querySelectorAll('.main-service').forEach(service => {
                if (service !== mainService) {
                    service.classList.remove('expanded');
                }
            });
            mainService.classList.toggle('expanded');
        });
    });

    // Initialize content from URL
    const { service, subService } = getServiceFromUrl();
    updateServiceContent(service, subService);
});
