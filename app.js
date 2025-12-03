/**
 * NEXUS Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Utilities ---
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    // --- State ---
    let chartInstances = [];
    let resizeObservers = [];

    // --- Toast Notification ---
    const showToast = (msg, type = 'info') => {
        const t = document.createElement('div');
        t.className = `toast ${type}`;
        t.textContent = msg;
        const container = $('#toast');
        container.appendChild(t);
        
        // Animation
        requestAnimationFrame(() => {
            t.style.opacity = '1';
            t.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            t.style.opacity = '0';
            t.style.transform = 'translateX(100%)';
            setTimeout(() => t.remove(), 300);
        }, 3000);
    };

    // --- Navigation System ---
    const navigateTo = (hash, updateHistory = true) => {
        const id = hash || '#dashboard';
        const target = $(id);

        if (!target) return;

        // 1. Update History
        if (updateHistory && window.location.hash !== id) {
            history.pushState(null, '', id);
        }

        // 2. Hide all pages & remove active nav
        $$('.page').forEach(p => p.classList.remove('active'));
        $$('.nav-item').forEach(n => n.classList.remove('active'));

        // 3. Show target page
        target.classList.add('active');
        
        // 4. Highlight nav
        const navLink = $(`nav [href="${id}"]`);
        if (navLink) navLink.classList.add('active');

        // 5. Mobile: Close sidebar
        if (window.innerWidth <= 992) {
            $('#sidebar').classList.remove('open');
        }

        // 6. Special Case: ECharts Resize All Charts
        if (id === '#charts') {
            requestAnimationFrame(() => {
                chartInstances.forEach(instance => {
                    if (instance) instance.resize();
                });
            });
        }
    };

    // Handle Browser Back/Forward
    window.addEventListener('popstate', () => {
        navigateTo(window.location.hash, false);
    });

    // Handle Click Navigation (Event Delegation)
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            navigateTo(link.getAttribute('href'));
        }
    });

    // --- Feature: Theme Toggle ---
    const initTheme = () => {
        const btn = $('#themeBtn');
        const updateBtnText = () => {
            const isDark = document.documentElement.dataset.theme === 'dark';
            btn.textContent = isDark ? 'MOON' : 'SUN';
        };
        
        btn.addEventListener('click', () => {
            const current = document.documentElement.dataset.theme;
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.dataset.theme = next;
            updateBtnText();
            // Update charts if needed (e.g. background)
            setTimeout(updateChartsTheme, 100);
        });
        
        updateBtnText(); // Initial state
    };

    // --- Feature: Color Scheme & Chart Updates ---
    const updateChartsTheme = () => {
        const style = getComputedStyle(document.documentElement);
        const accent = style.getPropertyValue('--accent').trim();
        const secondary = style.getPropertyValue('--secondary').trim();
        const success = style.getPropertyValue('--success').trim();
        const warning = style.getPropertyValue('--warning').trim();
        const danger = style.getPropertyValue('--danger').trim();

        // Chart 1: Line (Accent + Success)
        if (chartInstances[0]) {
            chartInstances[0].setOption({
                series: [
                    { itemStyle: { color: accent } },
                    { itemStyle: { color: success } }
                ]
            });
        }
        
        // Chart 2: Bar (Secondary + Accent)
        if (chartInstances[1]) {
            chartInstances[1].setOption({
                series: [
                    { itemStyle: { color: secondary } },
                    { itemStyle: { color: accent } }
                ]
            });
        }

        // Chart 3: Pie (Palette)
        if (chartInstances[2]) {
            chartInstances[2].setOption({
                color: [accent, secondary, warning, success, danger]
            });
        }
    };

    const initColorScheme = () => {
        const btn = $('#colorSchemeBtn');
        const panel = $('#colorSchemePanel');
        const options = $$('.scheme-option');
        
        // Load saved scheme
        const savedScheme = localStorage.getItem('nexus_scheme') || 'purple';
        document.documentElement.dataset.scheme = savedScheme;
        
        // Initial Chart Update (wait for DOM/Styles)
        setTimeout(updateChartsTheme, 100);

        // Update active state
        options.forEach(opt => {
            if (opt.dataset.scheme === savedScheme) opt.classList.add('active');
            else opt.classList.remove('active');
        });

        // Toggle Panel
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            panel.classList.toggle('open');
        });

        // Close Panel on click outside
        document.addEventListener('click', (e) => {
            if (!panel.contains(e.target) && e.target !== btn) {
                panel.classList.remove('open');
            }
        });

        // Switch Scheme
        options.forEach(opt => {
            opt.addEventListener('click', () => {
                const scheme = opt.dataset.scheme;
                document.documentElement.dataset.scheme = scheme;
                localStorage.setItem('nexus_scheme', scheme);
                
                // Update active class
                options.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                
                // Update Charts
                updateChartsTheme();
            });
        });
    };

    // --- Feature: Custom Select ---
    const initCustomSelect = () => {
        $$('.custom-select-container').forEach(container => {
            const trigger = container.querySelector('.custom-select-trigger');
            const options = container.querySelectorAll('.custom-option');
            const hiddenInput = container.querySelector('.custom-select-input');

            // Toggle Open
            trigger.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent document click from closing immediately
                
                // Close other selects & dates
                $$('.custom-select-container').forEach(c => {
                    if (c !== container) c.classList.remove('open');
                });
                $$('.custom-date-container').forEach(c => c.classList.remove('open'));
                
                container.classList.toggle('open');
            });

            // Handle Option Click
            options.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (option.classList.contains('disabled')) return;

                    // Update UI
                    options.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    trigger.textContent = option.textContent;
                    
                    // Update Value
                    if (hiddenInput) {
                        hiddenInput.value = option.dataset.value;
                        // Trigger change event if needed
                        hiddenInput.dispatchEvent(new Event('change'));
                    }

                    // Close
                    container.classList.remove('open');
                });
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.custom-select-container') && !e.target.closest('.custom-date-container')) {
                $$('.custom-select-container').forEach(c => c.classList.remove('open'));
                $$('.custom-date-container').forEach(c => c.classList.remove('open'));
            }
        });
    };

    // --- Feature: Custom Date Picker ---
    const initCustomDatePicker = () => {
        $$('.custom-date-container').forEach(container => {
            const trigger = container.querySelector('.custom-date-trigger');
            const calendar = container.querySelector('.custom-calendar');
            const hiddenInput = container.querySelector('.custom-date-input');
            const daysContainer = container.querySelector('.calendar-days');
            const monthDisplay = container.querySelector('.current-month');
            const prevBtn = container.querySelector('.calendar-nav.prev');
            const nextBtn = container.querySelector('.calendar-nav.next');

            let currentDate = new Date(); // Today
            let selectedDate = new Date(hiddenInput.value || new Date()); // Selected value
            let displayDate = new Date(selectedDate); // Month being viewed

            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];

            const renderCalendar = () => {
                displayDate.setDate(1); // Set to 1st of month
                
                const lastDay = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate();
                const prevLastDay = new Date(displayDate.getFullYear(), displayDate.getMonth(), 0).getDate();
                const firstDayIndex = displayDate.getDay();
                const lastDayIndex = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDay();
                const nextDays = 7 - lastDayIndex - 1;

                monthDisplay.textContent = `${months[displayDate.getMonth()]} ${displayDate.getFullYear()}`;

                let days = "";

                // Previous Month Days
                for (let x = firstDayIndex; x > 0; x--) {
                    days += `<div class="calendar-day empty"></div>`;
                }

                // Current Month Days
                for (let i = 1; i <= lastDay; i++) {
                    const isToday = i === new Date().getDate() && displayDate.getMonth() === new Date().getMonth() && displayDate.getFullYear() === new Date().getFullYear();
                    const isSelected = i === selectedDate.getDate() && displayDate.getMonth() === selectedDate.getMonth() && displayDate.getFullYear() === selectedDate.getFullYear();
                    
                    let classes = "calendar-day";
                    if (isToday) classes += " today";
                    if (isSelected) classes += " selected";

                    days += `<div class="${classes}" data-day="${i}">${i}</div>`;
                }

                daysContainer.innerHTML = days;

                // Add Click Events to Days
                container.querySelectorAll('.calendar-day:not(.empty)').forEach(day => {
                    day.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const dayNum = parseInt(day.dataset.day);
                        selectedDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), dayNum);
                        
                        // Format YYYY-MM-DD
                        const y = selectedDate.getFullYear();
                        const m = String(selectedDate.getMonth() + 1).padStart(2, '0');
                        const d = String(selectedDate.getDate()).padStart(2, '0');
                        const dateStr = `${y}-${m}-${d}`;

                        // Update Trigger & Input
                        trigger.textContent = dateStr;
                        hiddenInput.value = dateStr;

                        // Re-render to show selection
                        renderCalendar();

                        // Close calendar
                        container.classList.remove('open');
                    });
                });
            };

            // Initial Render
            renderCalendar();

            // Toggle Open
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close others
                $$('.custom-select-container').forEach(c => c.classList.remove('open'));
                $$('.custom-date-container').forEach(c => {
                    if(c !== container) c.classList.remove('open');
                });

                container.classList.toggle('open');
            });

            // Navigation
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                displayDate.setMonth(displayDate.getMonth() - 1);
                renderCalendar();
            });

            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                displayDate.setMonth(displayDate.getMonth() + 1);
                renderCalendar();
            });
        });
    };

    // --- Feature: Mobile Menu ---
    $('#menuBtn').addEventListener('click', () => {
        $('#sidebar').classList.toggle('open');
    });

    // --- Feature: Login Form ---
    const loginForm = $('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate login delay
            const btn = loginForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = '登录中...';
            btn.disabled = true;

            setTimeout(() => {
                navigateTo('#dashboard');
                showToast('登录成功！欢迎回来。', 'success');
                btn.textContent = originalText;
                btn.disabled = false;
            }, 800);
        });
    }

    // --- Feature: Range Slider ---
    const rangeSlider = $('#myRange');
    const rangeValueDisplay = $('#rangeValue');
    if (rangeSlider && rangeValueDisplay) {
        rangeValueDisplay.textContent = rangeSlider.value;
        rangeSlider.addEventListener('input', () => {
            rangeValueDisplay.textContent = rangeSlider.value;
        });
    }

    // --- Feature: ECharts Multi Charts ---
    const initCharts = () => {
        const chartIds = ['chart1', 'chart2', 'chart3'];
        chartIds.forEach((id, index) => {
            const chartDom = $(`#${id}`);
            if (!chartDom || typeof echarts === 'undefined') return;

            const chartInstance = echarts.init(chartDom);
            chartInstances[index] = chartInstance;

            let option;
            if (id === 'chart1') {
                // Multi Line Chart with Legend
                option = {
                    backgroundColor: 'transparent',
                    legend: { 
                        top: 10,
                        data: ['销售', '订单'],
                        textStyle: { color: '#94a3b8' }
                    },
                    grid: { top: 50, right: 20, bottom: 40, left: 40, containLabel: true },
                    tooltip: { trigger: 'axis' },
                    xAxis: { 
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisLabel: { color: '#94a3b8' }
                    },
                    yAxis: { type: 'value', axisLabel: { color: '#94a3b8' } },
                    series: [
                        {
                            name: '销售',
                            data: [120, 200, 150, 280, 330, 270, 400],
                            type: 'line',
                            smooth: true,
                            itemStyle: { color: '#8b5cf6' }
                        },
                        {
                            name: '订单',
                            data: [80, 150, 120, 220, 280, 230, 350],
                            type: 'line',
                            smooth: true,
                            itemStyle: { color: '#10b981' }
                        }
                    ]
                };
            } else if (id === 'chart2') {
                // Bar Chart with Legend
                option = {
                    backgroundColor: 'transparent',
                    legend: { 
                        top: 10,
                        data: ['直接访问', '邮件营销'],
                        textStyle: { color: '#94a3b8' }
                    },
                    tooltip: { trigger: 'axis' },
                    xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], axisLabel: { color: '#94a3b8' } },
                    yAxis: { type: 'value', axisLabel: { color: '#94a3b8' } },
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            data: [120, 200, 150, 80, 70, 110, 130],
                            itemStyle: { color: '#ec4899' }
                        },
                        {
                            name: '邮件营销',
                            type: 'bar',
                            data: [220, 182, 191, 234, 290, 330, 310],
                            itemStyle: { color: '#8b5cf6' }
                        }
                    ]
                };
            } else if (id === 'chart3') {
                // Pie Chart with Legend
                option = {
                    backgroundColor: 'transparent',
                    legend: { 
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                        data: ['直接访问', '联盟广告', '视频广告', '搜索引擎']
                    },
                    tooltip: { trigger: 'item' },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '50%',
                            data: [
                                { value: 1048, name: '直接访问' },
                                { value: 735, name: '联盟广告' },
                                { value: 580, name: '视频广告' },
                                { value: 484, name: '搜索引擎' }
                            ],
                            emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
                        }
                    ]
                };
            }

            chartInstance.setOption(option);

            // Resize Observer
            const observer = new ResizeObserver(() => chartInstance.resize());
            resizeObservers[index] = observer;
            observer.observe(chartDom);
        });
    };

    // --- Initialization ---
    initTheme();
    initColorScheme();
    initCustomSelect();
    initCustomDatePicker();
    initCharts();
    initAccordion();
    initAlerts();
    initCollapse();
    initTabs();
    initPopovers();
    initModal();
    initToastDemo();
    initTagsInput();
    initMultiSelect();
    initBtnGroupActive();
    
    // Initial Navigation
    navigateTo(location.hash);

    // --- Feature: Accordion ---
    function initAccordion() {
        $$('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const content = header.nextElementSibling;
                
                // Toggle current
                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = 0;
                }
            });
        });
    }

    // --- Feature: Alert Close ---
    function initAlerts() {
        $$('.alert .close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const alert = e.target.closest('.alert');
                alert.style.opacity = '0';
                setTimeout(() => alert.remove(), 300);
            });
        });
    }

    // --- Feature: Collapse ---
    function initCollapse() {
        const btn = $('#collapseBtn');
        const content = $('#collapseContent');
        if (btn && content) {
            btn.addEventListener('click', () => {
                content.classList.toggle('show');
                if (content.classList.contains('show')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = 0;
                }
            });
        }
    }

    // --- Feature: Tabs ---
    function initTabs() {
        $$('.tab-item').forEach(tab => {
            tab.addEventListener('click', () => {
                const container = tab.closest('.tabs');
                const targetId = tab.dataset.tab;
                const targetContent = container.querySelector(`#${targetId}`);

                if (!targetContent) return;

                // Remove active
                container.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
                container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

                // Add active
                tab.classList.add('active');
                targetContent.classList.add('active');
            });
        });
    }

    // --- Feature: Popovers ---
    function initPopovers() {
        $$('.popover-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Remove existing popovers
                $$('.popover').forEach(p => p.remove());

                // Create Popover
                const content = trigger.dataset.content;
                const popover = document.createElement('div');
                popover.className = 'popover visible';
                popover.textContent = content;
                document.body.appendChild(popover);

                // Position
                const rect = trigger.getBoundingClientRect();
                const popRect = popover.getBoundingClientRect();
                
                let top = rect.top - popRect.height - 10;
                let left = rect.left + (rect.width / 2) - (popRect.width / 2);

                popover.style.top = `${top + window.scrollY}px`;
                popover.style.left = `${left + window.scrollX}px`;
            });
        });

        // Close Popover on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.popover') && !e.target.closest('.popover-trigger')) {
                $$('.popover').forEach(p => p.remove());
            }
        });
    }

    // --- Feature: Modal ---
    function initModal() {
        const modal = $('#myModal');
        const openBtn = $('#openModalBtn');
        const closeBtns = $$('.close-modal, .close-modal-btn');

        if (openBtn && modal) {
            openBtn.addEventListener('click', () => {
                modal.classList.add('open');
            });
            
            closeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    modal.classList.remove('open');
                });
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('open');
                }
            });
        }
    }

    // --- Feature: Toast Demo ---
    function initToastDemo() {
        const btn = $('#showToastBtn');
        if (btn) {
            btn.addEventListener('click', () => {
                showToast('这是一条成功的通知消息！', 'success');
            });
        }
    }

    // --- Feature: Multi Tags Input ---
    function initTagsInput() {
        const container = $('#tagsInput');
        if (!container) return;
        
        const input = container.querySelector('.tags-input');
        const tagsList = container.querySelector('.tags-list');

        const createTag = (text) => {
            const tag = document.createElement('span');
            tag.className = 'tag-item';
            tag.innerHTML = `${text} <i class="fas fa-times"></i>`;
            
            tag.querySelector('i').addEventListener('click', () => {
                tag.remove();
            });
            
            return tag;
        };

        // Existing removal
        tagsList.querySelectorAll('.tag-item i').forEach(icon => {
            icon.addEventListener('click', () => icon.parentElement.remove());
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const text = input.value.trim();
                if (text) {
                    tagsList.appendChild(createTag(text));
                    input.value = '';
                }
            }
        });
    }

    // --- Feature: Button Group Active State ---
    function initBtnGroupActive() {
        $$('.btn-group .btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const group = this.parentElement;
                group.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // --- Feature: Multi Select Dropdown ---
    function initMultiSelect() {
        const container = $('.multi-select-container');
        if (!container) return;

        const trigger = container.querySelector('.multi-select-trigger');
        const options = container.querySelectorAll('input[type="checkbox"]');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            container.classList.toggle('open');
        });

        const updateTrigger = () => {
            const selected = [];
            options.forEach(opt => {
                if (opt.checked) selected.push(opt.value);
            });
            
            if (selected.length === 0) {
                trigger.textContent = '请选择选项...';
            } else if (selected.length <= 2) {
                trigger.textContent = selected.join(', ');
            } else {
                trigger.textContent = `${selected.length} 个已选择`;
            }
        };

        options.forEach(opt => {
            opt.addEventListener('change', updateTrigger);
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                container.classList.remove('open');
            }
        });
    }

});
