/*!
* WhiteMinimalist-Theme v1.1
* https://www.shmaur.com/
*
* Licensed Apache-2.0 © shmaur
*/

// 页面加载后，展开指定的笔记所在的树结构
document.addEventListener(
    "DOMContentLoaded",
    () => {
        toggleSubTreeByNoteId();  // 执行函数，展开相关的树结构
        handleResize()

        // 默认为fou
        localStorage.setItem('iscatelogue', 'false');

        // 回到顶部的按钮
        let toTopButton = document.getElementById('onGoTop');

        // 移动端目录的按钮
        let catalogueButton = document.getElementById('catalogue');
        let catalogueCloseButton = document.getElementById('toc-pane-content-close');
        let cleftMenuNavCloseButton = document.getElementById('left-menu-nav-close');

        let outlineButton = document.getElementById('outline');
        let outlinemenunavButton = document.getElementById('outline-menu-nav');

        // 目录元素
        let cataloguePanButton = document.getElementById('toc-pane');

      

        // 初始化按钮为隐藏
        toTopButton.style.display = 'none';
        // 设定一个阈值，比如滚动超过200px时显示按钮
        const threshold = 300;
        // 监听滚动事件
        window.addEventListener('scroll', function () {
            // 获取滚动条距离顶部的距离
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            // 如果滚动条位置大于阈值，显示按钮
            if (scrollTop > threshold) {
                toTopButton.style.display = 'block';
                toTopButton.style.opacity = 1
            } else {
                // 否则隐藏按钮
                toTopButton.style.display = 'none';
                toTopButton.style.opacity = 0
            }
        });

        // 定义滚动到顶部的函数
        function scrollToTop() {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            } else {
                // 滚动到顶部后隐藏按钮
                toTopButton.style.display = 'none';
            }
        }
        // 获取当前滚动位置距离顶部的距离
        function getCurrentScrollPosition() {
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        }

        const CurrentscrollTop = getCurrentScrollPosition();
        // 如果滚动条位置大于阈值，显示按钮
        if (CurrentscrollTop > threshold) {
            toTopButton.style.display = 'block';
            toTopButton.style.opacity = 1
        } else {
            // 否则隐藏按钮
            toTopButton.style.display = 'none';
            toTopButton.style.opacity = 0
        }

        // 绑定按钮点击事件
        toTopButton.addEventListener('click', scrollToTop);
        let width =0
        // 目录在移动端的显示
        function handleResize() {
            // 请求一个动画帧
            requestAnimationFrame(function () {
                  // 屏幕宽度
         width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                // 窗口的宽度和高度
                var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                if (width < 1120) {
                    outlineButton.style.display = 'block';
                }else{
                    outlineButton.style.display = 'none';
                }
                if (width < 1100 && cataloguePanButton) {
                    catalogueButton.style.display = 'block';
                    localStorage.setItem('iscatelogue', 'true');

                } else {
                    catalogueButton.style.display = 'none';
                    localStorage.setItem('iscatelogue', 'false');
                }

            });
        }

        // 绑定handleResize函数到resize事件
        window.addEventListener('resize', handleResize);

        // 目录判断 
        function istoggle() {
            let value = JSON.parse(localStorage.getItem('iscatelogue'));


            let val = !value
            localStorage.setItem('iscatelogue', val);
            if (val) cataloguePanButton.classList.add('showCatalogue');
            if (!val) cataloguePanButton.classList.remove('showCatalogue');
        }
        // 菜单导航判断
        function outlineIstoggle() {
            let value = JSON.parse(localStorage.getItem('iscatelogue'));


            let val = !value
            localStorage.setItem('iscatelogue', val);
            if (val) outlinemenunavButton.classList.add('showCatalogue');
            if (!val) outlinemenunavButton.classList.remove('showCatalogue');
        }

        // 绑定按钮点击事件
        catalogueButton?catalogueButton.addEventListener('click', istoggle):'';
        catalogueCloseButton?catalogueCloseButton.addEventListener('click', istoggle):'';
        outlineButton?outlineButton.addEventListener('click', outlineIstoggle):'';
        cleftMenuNavCloseButton?cleftMenuNavCloseButton.addEventListener('click', outlineIstoggle):'';

        // 判断目录按钮是否显示
        if (cataloguePanButton && width < 610) {
            catalogueButton.style.display = 'block';

            localStorage.setItem('iscatelogue', 'false');
        }


        
        /*
        // 博客内的文档序号编码规则，自动添加
        document.addEventListener("DOMContentLoaded", function () {
            const headers = ["h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10"];
        
            // 中文数字映射表（支持到 99）
            const chineseNumbers = generateChineseNumbers();
        
            // 序号存储
            const numberMap = {
                'h2': 0, 'h3': 0, 'h4': 0, 'h5': 0, 
                'h6': 0, 'h7': 0, 'h8': 0, 'h9': 0, 'h10': 0
            };
        
            headers.forEach((header, index) => {
                const elements = document.querySelectorAll(header);
        
                elements.forEach(element => {
                    // 更新当前标题的序号
                    numberMap[header]++;
        
                    // 重置比当前标题级别低的序号
                    for (let i = index + 1; i < headers.length; i++) {
                        numberMap[headers[i]] = 0;
                    }
        
                    // 生成标题序号字符串
                    let numbering = "";
                    if (header === 'h2') {
                        numbering = `${chineseNumbers[numberMap[header]]}、`;
                    } else {
                        const parentHeader = headers[index - 1];
                        const parentNumber = numberMap[parentHeader];
                        numbering = `${parentNumber}.${numberMap[header]} `;
                    }
        
                    // 添加序号到标题
                    element.textContent = `${numbering} ${element.textContent}`;
                });
            });
        
            function generateChineseNumbers() {
                const digits = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
                let result = [""];
        
                for (let i = 1; i < 100; i++) {
                    let str = "";
                    let tens = Math.floor(i / 10);
                    let ones = i % 10;
                    if (tens > 1) str += digits[tens];
                    if (tens >= 1) str += "十";
                    if (ones > 0) str += digits[ones];
                    result.push(str);
                }
        
                return result;
            }
        });
        
        */


function toggleSubTree(noteId) {
            console.log("点击了：" + noteId)
            const allItems = document.querySelectorAll('li[id^="subtree-"]');
            allItems.forEach(item => {
                if (item.id !== 'subtree-' + noteId) {
                    item.classList.add('menu-hidden');
                }
            });

            const subtree = document.getElementById('subtree-' + noteId);
            if (subtree) {
                subtree.classList.remove('menu-hidden');
            }
            // window.location.replace(noteId)
        }
        

        // 根据页面加载的笔记 ID 展开相关的树结构
        function toggleSubTreeByNoteId() {
            // 获取目标笔记的 ID
            let noteId = document.body.getAttribute("data-note-id");
            console.log("Loaded Note ID:", noteId);  // 调试信息

            // 获取目标笔记节点
            const targetNote = document.querySelector(`span[id="menu-node-id-${noteId}"]`);
            console.log("Target Note:", targetNote);  // 调试信息

            if (targetNote) {
                // 移除所有已选中的元素的 'selected' 类
                document.querySelectorAll('.node-title.selected, .leaf-title.selected').forEach(el => {
                    el.classList.remove('selected');
                });

                // 获取目标笔记节点的一级节点ID
                const firstLevelId = targetNote.getAttribute('data-first-level-id');
                console.log("First Level ID:", firstLevelId);  // 调试信息

                const firstLevelTitleElement = document.getElementById('menu-node-id-' + firstLevelId);
                if (firstLevelTitleElement) {
                    document.getElementById('dynamic-menu-title').textContent = firstLevelTitleElement.textContent + '目录';
                }

                if (firstLevelId) {
                    // 选中当前元素
                    document.querySelectorAll('.node-title.selected, .leaf-title.selected').forEach(el => {
                        el.classList.remove('selected');
                    });

                    // 为选中的笔记节点添加选中效果
                    targetNote.classList.add('selected');

                    toggleSubTree(firstLevelId)


                } else {
                    console.error(`未找到一级节点ID，笔记ID为 ${noteId}`);
                }
            } else {
                console.error(`未找到笔记ID为 ${noteId} 的节点`);
            }
        }


        document.querySelectorAll('.with-submenu').forEach(button => {
            button.addEventListener('click', function () {
                const submenu = this.nextElementSibling;
                submenu.classList.toggle('active');
                button.classList.toggle('active');
            });
        });

        
    },
    false
)

/*!
 * Ankia-Theme v1.7
 * https://ankia.top/
 *
 * Licensed Apache-2.0 © 东东
 */
async function fetchNote(noteId = null) {
    if (!noteId) {
        noteId = document.body.getAttribute("data-note-id");
    }

    const resp = await fetch(`api/notes/${noteId}`);


    return await resp.json();
}
document.addEventListener(
    "DOMContentLoaded",
    () => {
        const toggleMenuButton = document.getElementById("toggleMenuButton");
        const mobileMenuContainer = document.getElementById("mobileMenuContainer");
        const bloggerInfoCard = document.getElementById("bloggerInfoCard");
        const menuCard = document.getElementById("menuCard");
        const main = document.getElementById("main");

        let isCardsAdded = false;

        toggleMenuButton.addEventListener("click", () => {
            toggleMenuButton.classList.toggle("active");
            document.querySelector('.navbar-links-mobile').classList.toggle('active');

            if (!isCardsAdded) {
                bloggerInfoCard.style.setProperty("display", "flex", "important");
                menuCard.style.setProperty("display", "flex", "important");
                mobileMenuContainer.appendChild(bloggerInfoCard);
                mobileMenuContainer.appendChild(menuCard);
                main.style.display = "none";
                isCardsAdded = true;
            } else {
                mobileMenuContainer.removeChild(bloggerInfoCard);
                mobileMenuContainer.removeChild(menuCard);
                main.style.display = "block";
                isCardsAdded = false;
            }

            /*
                  mobileMenuContainer.classList.toggle("showMenu");
                  */
        });
    },
    false
);
document.addEventListener(
    "DOMContentLoaded",
    () => {

        var navigationItems = document.querySelectorAll(".navigationItemsStyle");
        // 为每个.navigationItemsStyle元素添加事件监听器
        navigationItems.forEach(function (item) {
            var button = item.querySelector(".menuLinkStyle");
            var dropDown = item.querySelector(".dropDownStyle");
            if (!button || !dropDown) {
                return;
            }
            var svgElement = button.querySelector("svg");
            let isHovering = false;

            button.addEventListener("mouseover", function () {
                isHovering = true;
                dropDown.style.display = "flex";

                svgElement.classList.add("unfolding");
            });

            button.addEventListener("mouseout", function () {
                isHovering = false;
                setTimeout(function () {
                    if (!isHovering) {
                        dropDown.style.display = "none";
                        svgElement.classList.remove("unfolding");
                    }
                }, 200);
            });

            dropDown.addEventListener("mouseover", function () {
                isHovering = true;
            });

            dropDown.addEventListener("mouseout", function () {
                isHovering = false;
                setTimeout(function () {
                    if (!isHovering) {
                        dropDown.style.display = "none";
                        svgElement.classList.remove("unfolding");
                    }
                }, 200);
            });
        });
    },
    false
);
/*
document.addEventListener(
  "DOMContentLoaded",
  () => {
    var prevScrollPos = window.pageYOffset;
    const scrollDistance = 10;

    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      const navigationBar = document.getElementById("navigationBar");
      if (prevScrollPos > currentScrollPos) {
        navigationBar.classList.remove("hide");
      } else if (
        currentScrollPos - prevScrollPos > scrollDistance &&
        !document.querySelector("#mobileMenuContainer.showMenu")
      ) {
        navigationBar.classList.add("hide");
      }

      prevScrollPos = currentScrollPos;
    };
  },
  false
);*/

document.addEventListener(
    "DOMContentLoaded",
    () => {
        const rewardBtn = document.getElementById("rewardBtn");
        const rewardImgContainer = document.getElementById("rewardImgContainer");
        if (rewardBtn) {
            rewardBtn.addEventListener("click", function () {
                if (rewardImgContainer.style.display === "flex") {
                    rewardImgContainer.style.opacity = "0";
                    setTimeout(function () {
                        rewardImgContainer.style.display = "none";
                        rewardImgContainer.style.flexWrap = "";
                    }, 500);
                } else {
                    rewardImgContainer.style.opacity = "1";
                    rewardImgContainer.style.display = "flex";
                    rewardImgContainer.style.flexWrap = "wrap";
                }
            });
        }
    },
    false
);

document.addEventListener(
    "DOMContentLoaded",
    () => {
        const toc = document.getElementById("toc");
        if (!toc) return;
        const tocHeight = toc.clientHeight;

        const sections = document.querySelectorAll(
            "#content h2, #content h3, #content h4, #content h5, #content h6"
        );
        const links = toc.querySelectorAll("a");

        links.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                const target = document.getElementById(
                    link.getAttribute("href").slice(1)
                );
                if (target) target.scrollIntoView({ behavior: "smooth" });
            });
        });

        function changeLinkState() {
            let index = sections.length;
            while (--index && window.scrollY < sections[index].offsetTop) { }

            links.forEach((link) => link.classList.remove("tocActive"));
            links[index].classList.add("tocActive");
        }

        function scrollToc() {
            const toc = document.getElementById("toc-pane");
            const tocContent = document.getElementById("toc");
            const tocHeight = parseFloat(
                window.getComputedStyle(toc).getPropertyValue("max-height")
            );
            let activeElement = toc.querySelector(".tocActive");
            let activeElementPosition = activeElement.offsetTop;
            if (activeElementPosition > tocHeight - 50) {
                toc.scrollTo({ top: 9999, behavior: "smooth" });
            } else if (
                tocContent.offsetHeight - activeElementPosition >
                tocHeight - 50
            ) {
                toc.scrollTo({ top: 0, behavior: "smooth" });
            }
        }

        changeLinkState();
        window.addEventListener("scroll", () => {
            changeLinkState();
            setTimeout(scrollToc, 500);
        });
    },
    false
);

document.addEventListener(
    "DOMContentLoaded",
    () => {
        // 添加行
        const codeBlocks = document.querySelectorAll("pre");
        codeBlocks.forEach(codeBlock => {
            codeBlock.classList.add("line-numbers");
        })
    },
    false
);

document.addEventListener(
    "DOMContentLoaded",
    () => {
        //字数统计
        const content = document.getElementById("content");
        if (!content) {
            return;
        }
        const articleWordCount = document.getElementById("articleWordCount");
        articleWordCount.innerText = content.innerText
            .split(/[\s-+:,/\\]+/)
            .filter((chunk) => chunk !== "")
            .join("").length;
    },
    false
);

document.addEventListener(
    "DOMContentLoaded",
    () => {
        const searchInput = document.getElementById("searchInput");
        const searchResults = document.getElementById("searchResults");
        const searchContainer = document.getElementById("searchContainer");
        const searchButton = document.getElementById("searchButton");
        const searchButtonMobile = document.getElementById("searchButton-mobile");

        function buildResultItem(result) {
            return `<a class="searchItems" href="./${result.id}">
                    <div class="itemsTitle">${result.title}</div>
                </a>`;
        }
        function debounce(executor, delay) {
            let timeout;
            return function (...args) {
                const callback = () => {
                    timeout = null;
                    Reflect.apply(executor, null, args);
                };
                if (timeout) clearTimeout(timeout);
                timeout = setTimeout(callback, delay);
            };
        }

        async function performSearch() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm !== "") {
                searchResults.innerHTML = "";

                const ancestor = document.body.dataset.ancestorNoteId;
                const query = searchInput.value;
                const resp = await fetch(
                    `api/notes?search=${query}&ancestorNoteId=${ancestor}`
                );
                const json = await resp.json();
                const results = json.results;
                for (const result of results) {
                    searchResults.innerHTML += buildResultItem(result);
                }
            }
        }
        searchButton.addEventListener("click", () => {
            searchContainer.style.display = "flex";
        });
        searchButtonMobile.addEventListener("click", () => {

            searchContainer.style.display = "flex";
            console.log("====" + searchContainer.style.display)
        });

        searchInput.addEventListener(
            "keyup",
            debounce(async () => {
                await performSearch();
            }, 400)
        );

        document.addEventListener("click", (event) => {
            if (
                !event.target.closest("#searchContainer") &&
                !event.target.closest("#searchButton") &&
                !event.target.closest("#searchButton-mobile")
            ) {
                searchContainer.style.display = "none";
            }
        });

    },
    false
);

document.addEventListener(
    "DOMContentLoaded",
    () => {
        //音乐播放器
        const playButtons = document.querySelectorAll(".playMusicButton");
        // 为每个按钮添加点击事件
        playButtons.forEach((button) => {
            button.addEventListener("click", function () {
                //用于判断是否是移动端
                const toggleMenuButton = document.getElementById("toggleMenuButton");
                var url = `//music.163.com/m/outchain/player?type=2&auto=1&height=32`;
                if (getComputedStyle(toggleMenuButton).display === "none") {
                    url = `//music.163.com/outchain/player?type=2&auto=1&height=32`;
                }
                let oldPlayer = document.getElementById("musicPlayer");
                if (oldPlayer != null) {
                    document.body.removeChild(oldPlayer);
                }
                const musicId = this.getAttribute("musicid");
                var musicPlayer = document.createElement("div");
                musicPlayer.id = "musicPlayer";

                musicPlayer.innerHTML = `<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=298 height=52 src="${url}&id=${musicId}"></iframe>`;
                document.body.appendChild(musicPlayer);
            });
        });
    },
    false
);
